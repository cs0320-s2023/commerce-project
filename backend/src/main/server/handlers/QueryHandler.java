package edu.brown.cs32.examples.sprint3.server.handlers;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.EvictingQueue;
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;

import edu.brown.cs32.examples.sprint3.JsonHandlers.JSONParser;
import edu.brown.cs32.examples.sprint3.server.utilities.GeoUtils.GeoData;
import edu.brown.cs32.examples.sprint3.server.utilities.GeoUtils.GeoFeatures;
import edu.brown.cs32.examples.sprint3.server.utilities.Serialize;
import spark.Request;
import spark.Response;
import spark.Route;

/*
 * This class is responsible for handling the query requests from the frontend.
 */
public class QueryHandler implements Route {
    private GeoData data;
    private EvictingQueue<String> searchHistory = EvictingQueue.create(10);

    
    public QueryHandler(String geoJsonData) {
        try {
        this.data = JSONParser.fromJson(geoJsonData);
        } catch (IOException e) {
        System.err.println("GeoJSON Data couldn't be deserialized.");
        }
    }
/*
 * gettter for searchHistory
 */
    public EvictingQueue<String> getSearchHistory() {
        return this.searchHistory;
    }

    /**
     * helper that matches the query to areaDescription and features in the GeoData
     * @param geoJsonData
     * @param keyword
     * @return GeoData object that contains only the features that match the query
     */
    private static GeoData findQueryMatches(GeoData geoJsonData, String keyword) {
        // Source: ipinedad-mmcpher1

        List<GeoFeatures> matchingFeatures = new ArrayList<>();
        for(GeoFeatures feature : geoJsonData.features()) {
          
          Map<String, String> areaDescription = feature.properties().areaDescription();
    
          boolean hasKeyword = false;
          for(String value : areaDescription.values()) {
            if(hasKeyword) break;
            
            String cleanedText = value.replaceAll("[^a-zA-Z0-9\\s]+", " ");
    
            String[] words = cleanedText.toLowerCase().split("\\s+");
            for (String word : words) {
              if(word.equals(keyword)) {
                hasKeyword = true;
                matchingFeatures.add(feature);
                break;
              }
            }
          }
        }
        GeoData matches = new GeoData("FeatureCollection", matchingFeatures);
        return matches;
      }
    
    
    // Source: https://guava.dev/releases/15.0/api/docs/com/google/common/collect/EvictingQueue.html
    // storing the last 10 history of queries in backend



/**
 * This method handles the query requests from the frontend.
 * serializes errors as needed(missing inputs, wrong inputs)
 * returns the matching features in the GeoData serialized
 */
    @Override
    public Object handle(Request request, Response response) {
        String keyword = request.queryParams("keyword");

        if (keyword == null || keyword.isBlank() || keyword == "") {
            return Serialize.error("error_bad_request", "keyword parameter is missing");
        }
        
        // storing the last 10 history of queries in backend
        if (!keyword.isBlank()) {
            searchHistory.add(keyword);
        }
        System.out.println(searchHistory);

        GeoData matchingFeatures = findQueryMatches(data, keyword);


   
        if (matchingFeatures.features().isEmpty()) {
            return Serialize.error("error_bad_request", "no features match the keyword. try another keyword.");
        }


        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("result", "success");
        successResponse.put("data", matchingFeatures);

        return Serialize.success(successResponse);
    }



    
}
