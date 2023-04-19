package edu.brown.cs32.examples.sprint3.server.handlers;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import edu.brown.cs32.examples.sprint3.JsonHandlers.JSONParser;
import edu.brown.cs32.examples.sprint3.server.utilities.Serialize;
import edu.brown.cs32.examples.sprint3.server.utilities.GeoUtils.GeoData;
import edu.brown.cs32.examples.sprint3.server.utilities.GeoUtils.GeoFeatures;
import spark.Request;
import spark.Response;
import spark.Route;
/* 
 * This class is responsible for handling the boundary filter requests from the frontend.
 */
public class BoundaryHandler implements Route {
    private GeoData data;

    public BoundaryHandler(String geoJsonData) {
        try {
        this.data = JSONParser.fromJson(geoJsonData);
        } catch (IOException e) {
        System.err.println("GeoJSON Data could not be deserialized.");
        }
    }
    
    
    /*
     * helper method that takes in a GeoData object and a bounding box and returns a GeoData object
     * that contains only the features that are within the bounding box
     */
    private static GeoData boundingCoords(GeoData geoJsonData,  Double minLat, Double maxLat, Double minLon, Double maxLon) {
        // Source: ipinedad-mmcpher1
        List<GeoFeatures> features = geoJsonData.features();
        List<GeoFeatures> matchingFeatures = new ArrayList<>();
        for(GeoFeatures feature : features) {
          // coords List: [minLat, maxLat, minLon, maxLon]
          List<Double> coords = findExtent(feature);
          if(coords.size() < 4) continue;
          // if feature minLat is less than boundingBox min don't include it
          if (coords.get(0) < minLat) continue;
          // if feature maxLat is greater than boundingBox max don't include it
          if(coords.get(1) > maxLat) continue;
          // if feature minLon is less than boundingBox min don't include it
          if(coords.get(2) < minLon) continue;
          // if feature maxLat is greater than boundingBox max don't include it
          if(coords.get(3) > maxLon) continue;
          matchingFeatures.add(feature);
        }
        GeoData result = new GeoData("FeatureCollection", matchingFeatures);
        return result;
      }
    /**
     * Helper method that finds bounds of a feature
     * @param feature
     * @return
     */
      private static List<Double> findExtent(GeoFeatures feature) {
        if(feature.geometry() == null) {
          return List.of();
        }
        double minLat = 90.0;
        double maxLat = -90.0;
        double minLon = 180.0;
        double maxLon = -180.0;
        // Source: https://geojson.org/geojson-spec.html#multipolygon
        List<List<Double>> linearRing = feature.geometry().coords().get(0).get(0);
        for(List<Double> position : linearRing) {
          double lon = position.get(0);
          double lat = position.get(1);
          if(lat < minLat) minLat = lat;
          if(lat > maxLat) maxLat = lat;
          if(lon < minLon) minLon = lon;
          if(lon > maxLon) maxLon = lon;
        }
        return List.of(minLat, maxLat, minLon, maxLon);
      }



/**
 * This method is responsible for handling the boundary filter requests from the frontend.
 * outputs error messages as needed
 * will serialize valid features if valid bounds are given
 */
    @Override
    public Object handle(Request request, Response response) throws Exception {
    
    String maxLat = request.queryParams("maxLat");
    String minLat = request.queryParams("minLat");
    String minLon = request.queryParams("minLon");
    String maxLon = request.queryParams("maxLon");

    double queryMinLat, queryMaxLat, queryMinLon, queryMaxLon;
    if (maxLat == null || minLat == null || maxLon == null || minLon == null) {
        return Serialize.error("error_bad_request","at least one of the max/min lat/lon parameters is missing"); 
    }


    try {
      queryMaxLat = Double.parseDouble(maxLat);
      queryMinLat = Double.parseDouble(minLat);
      queryMaxLon = Double.parseDouble(maxLon);
      queryMinLon = Double.parseDouble(minLon);

    } 
    catch (NumberFormatException e) {
        return Serialize.error("error_bad_request","all of the 4 max/min lat/lon parameters are required and must be numbers");
    }

    if (queryMinLat < -90 || queryMinLat > 90 || queryMaxLat < -90 || queryMaxLat > 90 || queryMinLon < -180 || queryMinLon > 180 || queryMaxLon < -180 || queryMaxLon > 180) {
        return Serialize.error("error_bad_request",
                "Data is now out of bounds, please enter a latitude between -90 and 90, and a longitude"
                    + " between -180 and 180.");
    }

    try {
        GeoData filteredResults = boundingCoords(data, queryMinLat, queryMaxLat, queryMinLon, queryMaxLon);
        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("result", "success");
        successResponse.put("data", filteredResults);

        // Moshi moshi = new Moshi.Builder().build();
        // Type type = Types.newParameterizedType(Map.class, String.class, Object.class);
        // JsonAdapter<Map<String, Object>> jsonAdapter = moshi.adapter(type);

        // return jsonAdapter.toJson(successResponse);
  
       return Serialize.success(successResponse);

    }
        catch (IllegalArgumentException e) {
            return "Error Encountered";
    }

  }
















  public boolean isWithinBounds(double[][] coords, double minLat, double maxLat, double minLon,
      double maxLon) {
    for (double[] coord : coords) {
      if (coord[0] >= minLat && coord[0] <= maxLat && coord[1] >= minLon && coord[1] <= maxLon) {
        return true;
      }
    }
    return false;
  }


  public record BoxSuccessResponse(String result, String content) {

    public BoxSuccessResponse(String content) {
      this("success",content);
    }

    /**
     * @return this response, serialized as Json
     */
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<BoxSuccessResponse> adapter = moshi.adapter(BoxSuccessResponse.class);
        return adapter.toJson(this);
      } catch (Exception e) {

        e.printStackTrace();
        throw e;
      }
    }
  }

  /**
   * This method ensures that the result is outputted when the user is finding the lat, long, temp, unit, and time of
   * a specific location after inputting invalid inputs, and it seralizes the content of the data from object to JSON.
   * @param result
   * @param errorType
   */
  public record BoxFailureResponse(String result, String errorType) {

    public BoxFailureResponse(String errorType) {
      this("error", errorType);

    }

    /**
     * @return this response, serialized as Json
     */
    String serialize() {
      try {
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<BoxFailureResponse> adapter = moshi.adapter(BoxFailureResponse.class);
        return adapter.toJson(this);
      } catch (Exception e) {
        e.printStackTrace();
        throw e;
      }
    }
  }
    }
    
