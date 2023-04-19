package edu.brown.cs32.examples.sprint3.handlers.QueryHandlers;

import com.squareup.moshi.JsonAdapter;
import edu.brown.cs32.examples.sprint3.server.handlers.QueryHandler;
import edu.brown.cs32.examples.sprint3.server.utilities.GeoUtils;
import edu.brown.cs32.examples.sprint3.server.utilities.Serialize;
import okio.Buffer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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

/**
 * This is a JUnit test for the QueryHandler class.
 * Utilizes redlining geojson file to test the QueryHandler class.
 */
public class TestQueryHandler {
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
        QueryHandler querier = new QueryHandler(data);
        Spark.get("query", querier);

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
        Spark.unmap("query");

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
     * Tests the QueryHandler api with no arguments.
     * @throws IOException
     */
    @Test
    public void testNoArgs() throws IOException{
        HttpURLConnection clientConnection = tryRequest("query");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("keyword parameter is missing", resp.get("message"));

    }

    /**
     * Tests the QueryHandler api with wrong arguments.
     * @throws IOException
     */
    @Test
    public void testWrongArg() throws IOException{
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
        QueryHandler querier = new QueryHandler(data);
        Spark.get("query1", querier);


        HttpURLConnection clientConnection = tryRequest("query1?keyword=zeeshanbhalwani");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("no features match the keyword. try another keyword.", resp.get("message"));

        // gets added to search history
        assertEquals(1, querier.getSearchHistory().size());


    }

    /**
     * Tests the QueryHandler api with correct arguments.
     * @throws IOException
     */
    @Test
    public void testCorrectArgs() throws IOException{
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
        QueryHandler querier = new QueryHandler(data);
        Spark.get("query2", querier);


        HttpURLConnection clientConnection = tryRequest("query2?keyword=detroit");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("success", resp.get("result"));


        // gets added to search history
        assertEquals(1, querier.getSearchHistory().size());

        // check features
        GeoUtils.GeoData features = geoJsonAdapter.fromJsonValue(resp.get("data"));
        assertNotNull(features);
        assertNotEquals(0, features.features().size());
    }
    /**
     * Tests the QueryHandler api with multiple arguments.
     * @throws IOException
     */
    @Test
    public void testMultipleArgs() throws IOException{
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
        QueryHandler querier = new QueryHandler(data);
        Spark.get("query4", querier);


        HttpURLConnection clientConnection = tryRequest("query4?keyword=new%20york");

        assertEquals(200, clientConnection.getResponseCode());
        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);
        assertEquals("error_bad_request", resp.get("result"));
        assertEquals("no features match the keyword. try another keyword.", resp.get("message"));

        // gets added to search history
        assertEquals(1, querier.getSearchHistory().size());
    }
    /**
     * Tests the search history and its limit
     * @throws IOException
     */
    @Test
    public void testEvictionQueue() throws IOException{
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
        QueryHandler querier = new QueryHandler(data);
        Spark.get("query3", querier);


        HttpURLConnection clientConnection = tryRequest("query3?keyword=a");
        HttpURLConnection clientConnection1 = tryRequest("query3?keyword=b");
        HttpURLConnection clientConnection2 = tryRequest("query3?keyword=c");
        HttpURLConnection clientConnection3 = tryRequest("query3?keyword=d");
        HttpURLConnection clientConnection4 = tryRequest("query3?keyword=e");
        HttpURLConnection clientConnection5 = tryRequest("query3?keyword=f");
        HttpURLConnection clientConnection6 = tryRequest("query3?keyword=g");
        HttpURLConnection clientConnection7 = tryRequest("query3?keyword=h");
        HttpURLConnection clientConnection8 = tryRequest("query3?keyword=i");
        HttpURLConnection clientConnection9 = tryRequest("query3?keyword=j");
        HttpURLConnection clientConnection10 = tryRequest("query3?keyword=k");
        HttpURLConnection clientConnection11 = tryRequest("query3?keyword=l");


        assertEquals(200, clientConnection.getResponseCode());
        assertEquals(200, clientConnection1.getResponseCode());
        assertEquals(200, clientConnection2.getResponseCode());
        assertEquals(200, clientConnection3.getResponseCode());
        assertEquals(200, clientConnection4.getResponseCode());
        assertEquals(200, clientConnection5.getResponseCode());
        assertEquals(200, clientConnection6.getResponseCode());
        assertEquals(200, clientConnection7.getResponseCode());
        assertEquals(200, clientConnection8.getResponseCode());
        assertEquals(200, clientConnection9.getResponseCode());
        assertEquals(200, clientConnection10.getResponseCode());
        assertEquals(200, clientConnection11.getResponseCode());

        Map resp = Serialize.adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

        assertNotNull(resp);


        // max 10 gets added to search history
        assertEquals(10, querier.getSearchHistory().size());
        assertTrue(querier.getSearchHistory().contains("c"));
        //fifo, a should should be removed
        assertFalse(querier.getSearchHistory().contains("a"));
    }




}
