package edu.brown.cs32.examples.sprint3.handlers.BoundHandlers;
import com.squareup.moshi.JsonAdapter;
import edu.brown.cs32.examples.sprint3.server.utilities.GeoUtils;
import edu.brown.cs32.examples.sprint3.server.utilities.Serialize;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import edu.brown.cs32.examples.sprint3.server.handlers.BoundaryHandler;
import spark.Spark;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

import static edu.brown.cs32.examples.sprint3.server.utilities.Serialize.moshi;
import static org.junit.jupiter.api.Assertions.*;

/*
 * This is a JUnit test for the BoundaryHandler class.
 * Utilizes MockGeoJSON file to test the BoundaryHandler class.
 */
public class TestMockBoundary {
    private JsonAdapter<GeoUtils.GeoData> geoJsonAdapter;
    /**
     * ran before everything to Set the Spark port number and to Remove the logging spam during tests.
     */
    @BeforeAll
    public static void setup_before_everything() {
        Spark.port(0);
        Logger.getLogger("").setLevel(Level.WARNING);
    }


    /**
     * ran before each test to Re-initialize state, etc. for _every_ test method run
     * and to restart the entire Spark server for every test! and to
     * not continue until the server is listening
     */
    @BeforeEach
    public void setup() {
        String data = "";
        try {
            Reader reader = new FileReader("src/main/java/edu/brown/cs32/examples/sprint3/data/mockGEO.json", StandardCharsets.UTF_8);
            BufferedReader bf = new BufferedReader(reader);
            data = bf.readLine();
        }
        catch (IOException e) {
            System.err.println("Could Not read GEO JSON Data.");
        }

        // Setting up the handler for the GET endpoints
        Spark.get("mockbounds", new BoundaryHandler(data));

        Spark.init();
        Spark.awaitInitialization(); // don't continue until the server is listening
        geoJsonAdapter = moshi.adapter(GeoUtils.GeoData.class);
    }

    /**
     *  ran after each test to Gracefully stop Spark listening on both endpoints and
     *  not proceed until the server is stopped
     */
    @AfterEach
    public void teardown() {
        // Gracefully stop Spark listening on both endpoints
        Spark.unmap("bounds");

        Spark.awaitStop(); // don't proceed until the server is stopped
    }


    /**
     * Helper to start a connection to a specific API endpoint/params
     * @param apiCall the call string, including endpoint
     *                (NOTE: this would be better if it had more structure!)
     * @return the connection for the given URL, just after connecting
     * @throws IOException if the connection fails for some reason
     */
    static private HttpURLConnection tryRequest(String apiCall) throws IOException {
        // Configure the connection (but don't actually send the request yet)
        URL requestURL = new URL("http://localhost:"+Spark.port()+"/"+apiCall);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();

        // The default method is "GET", which is what we're using here.
        // If we were using "POST", we'd need to say so.
        //clientConnection.setRequestMethod("GET");

        clientConnection.connect();
        return clientConnection;
    }

    /**
     * Tests the mockbounds endpoint with a successful request.
     * @throws IOException
     */
    @Test
    public void testMockSuccessfulBounds() throws IOException{
        HttpURLConnection clientConnection = tryRequest("mockbounds?minLat=30&maxLat=50&minLon=-90&maxLon=-30");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertNotNull(resp.get("data"));
        assertEquals("success", resp.get("result"));

        // check features
        GeoUtils.GeoData features = geoJsonAdapter.fromJsonValue(resp.get("data"));
        assertNotNull(features);
        assertNotEquals(0, features.features().size());
    }
    /**
     * Tests the mockbounds endpoint with a unsuccessful request.
     * @throws IOException
     */
    @Test
    public void testMockUnSuccessfulBounds() throws IOException{
        HttpURLConnection clientConnection = tryRequest("mockbounds?minLat=30&maxLat=50&minLon=30&maxLon=50");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertNotNull(resp.get("data"));
        assertEquals("success", resp.get("result"));
        assertEquals("{type=FeatureCollection, features=[]}", resp.get("data").toString());

        // check features
        GeoUtils.GeoData features = geoJsonAdapter.fromJsonValue(resp.get("data"));
        assertNotNull(features);
        assertEquals(0, features.features().size());
    }
    /**
     * Tests the mockbounds endpoint with a out of bounds request.
     * @throws IOException
     */
    @Test
    public void testMockWrongBounds() throws IOException{
        HttpURLConnection clientConnection = tryRequest("mockbounds?minLat=1000&maxLat=11&minLon=10&maxLon=11");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("Data is now out of bounds, please enter a latitude between -90 and 90, and a longitude between -180 and 180.", resp.get("message"));
    }






}


