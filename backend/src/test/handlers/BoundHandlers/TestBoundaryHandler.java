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
import java.util.concurrent.ThreadLocalRandom;
import java.util.logging.Level;
import java.util.logging.Logger;

import static edu.brown.cs32.examples.sprint3.server.utilities.Serialize.moshi;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests the BoundaryHandler class
 * utilizes redlining geojson to test the BoundaryHandler class
 */
public class TestBoundaryHandler {
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
            Reader reader = new FileReader("src/main/java/edu/brown/cs32/examples/sprint3/data/fullDownload.json", StandardCharsets.UTF_8);
            BufferedReader bf = new BufferedReader(reader);
            data = bf.readLine();
            } 
            catch (IOException e) {
            System.err.println("Could Not read GEO JSON Data.");
        }

    // Setting up the handler for the GET endpoints
        Spark.get("bounds", new BoundaryHandler(data));

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
     * Tests the boundary handler api with no arguments
     * @throws IOException
     */
    @Test
    public void testNoArgs() throws IOException{
        HttpURLConnection clientConnection = tryRequest("bounds");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("at least one of the max/min lat/lon parameters is missing", resp.get("message"));
        clientConnection.disconnect();

    }
    /**
     * Tests the boundary handler api with out of bound arguments
     * @throws IOException
     */
    @Test
    public void testOutOfBoundArgs() throws IOException{
        HttpURLConnection clientConnection = tryRequest("bounds?minLat=42.020223&maxLat=42.512096&minLon=-83.484421&maxLon=900.297897");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("Data is now out of bounds, please enter a latitude between -90 and 90, and a longitude between -180 and 180.", resp.get("message"));
        clientConnection.disconnect();
    }
    /**
     * Tests the boundary handler api with wrong format arguments
     * @throws IOException
     */
    @Test
    public void testWrongFormatArgs() throws IOException{
        HttpURLConnection clientConnection = tryRequest("bounds?minLat=happy&maxLat=42.512096&minLon=-83.484421&maxLon=900.297897");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("all of the 4 max/min lat/lon parameters are required and must be numbers", resp.get("message"));
        clientConnection.disconnect();
    }
    /**
     * Tests the boundary handler api with wrong number of arguments
     * @throws IOException
     */
    @Test
    public void testWrongNumArgs() throws IOException{
        HttpURLConnection clientConnection = tryRequest("bounds?maxLat=42.512096&minLon=-83.484421&maxLon=900.297897");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("at least one of the max/min lat/lon parameters is missing", resp.get("message"));
        clientConnection.disconnect();
    }
    /**
     * Tests the boundary handler api with correct arguments
     * @throws IOException
     */
    @Test
    public void testSuccessfulBounds() throws IOException{
        HttpURLConnection clientConnection = tryRequest("bounds?minLat=42.020223&maxLat=42.512096&minLon=-83.484421&maxLon=-82.297897");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertNotNull(resp.get("data"));
        assertEquals("success", resp.get("result"));
        clientConnection.disconnect();
    }

    /**
     * Fuzz Tests the boundary handler api with all correct arguments
     * status should always be 200
     * always success result
     * @throws IOException
     */
    @Test
    public void testFuzzAllSuccessfulBounds() throws IOException{
        final int numTrials = 50;

        for(int count=0;count<numTrials;count++) {
            // All valid lat/lon values -- tests that won't error
            double maxlat = ThreadLocalRandom.current().nextDouble(-90, 90);
            double minlat = ThreadLocalRandom.current().nextDouble(-90, maxlat);
            double maxlon = ThreadLocalRandom.current().nextDouble(-180, 180);
            double minlon = ThreadLocalRandom.current().nextDouble(-180, maxlon);

            HttpURLConnection clientConnection = tryRequest(
                    "bounds?"+"maxLat="+maxlat+"&minLat="+minlat+"&maxLon="+maxlon+"&minLon="+minlon);

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("success", resp.get("result"));


        // check features
        GeoUtils.GeoData features = geoJsonAdapter.fromJsonValue(resp.get("data"));
        assertNotNull(features);

        clientConnection.disconnect();
        }

    }

    /**
     * Fuzz Tests the boundary handler api with bounds outside usa
     * status should always be 200
     * always success result
     * size of features should be 0 because no redlining data outside of usa
     * @throws IOException
     */
    @Test
    public void testFuzzAllOutsideUSA() throws IOException{
        final int numTrials = 50;

        for(int count=0;count<numTrials;count++) {

            double maxlat = ThreadLocalRandom.current().nextDouble(50, 90);
            double minlat = ThreadLocalRandom.current().nextDouble(50, maxlat);
            double maxlon = ThreadLocalRandom.current().nextDouble(-180, 60);
            double minlon = ThreadLocalRandom.current().nextDouble(-180, maxlon);

            HttpURLConnection clientConnection = tryRequest(
                    "bounds?"+"maxLat="+maxlat+"&minLat="+minlat+"&maxLon="+maxlon+"&minLon="+minlon);

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


            clientConnection.disconnect();
        }


    }

    /**
     * Fuzz Tests the boundary handler api with bounds inside usa
     * status should always be 200
     * always success result
     * size of features should be > 0 because redlining data inside of usa
     * @throws IOException
     */
    @Test
    public void testFuzzNewEngland() throws IOException{
        final int numTrials = 50;

        for(int count=0;count<numTrials;count++) {

            double maxlat = ThreadLocalRandom.current().nextDouble(40, 45);
            double minlat = ThreadLocalRandom.current().nextDouble(30, 32);
            double maxlon = ThreadLocalRandom.current().nextDouble(-75, -70);
            double minlon = ThreadLocalRandom.current().nextDouble(-82, -80);

            HttpURLConnection clientConnection = tryRequest(
                    "bounds?"+"maxLat="+maxlat+"&minLat="+minlat+"&maxLon="+maxlon+"&minLon="+minlon);

            assertEquals(200, clientConnection.getResponseCode());
            Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

            assertNotNull(resp);
            assertNotNull(resp.get("data"));
            assertEquals("success", resp.get("result"));

            // check features
            GeoUtils.GeoData features = geoJsonAdapter.fromJsonValue(resp.get("data"));
            assertNotNull(features);
            assertNotEquals(0, features.features().size());


            clientConnection.disconnect();
        }

    }
}
