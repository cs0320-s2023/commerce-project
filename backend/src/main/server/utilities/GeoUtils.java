package edu.brown.cs32.examples.sprint3.server.utilities;

import java.util.List;
import java.util.Map;

import com.squareup.moshi.Json;

/**
 * This class contains the data structures for the GeoJSON data.
 */
public class GeoUtils {
    public record GeoData(
      @Json(name = "type") String type,
      @Json(name = "features") List<GeoFeatures> features
  ){}



  public record GeoFeatures(
      @Json(name = "type") String type,
      @Json(name = "geometry") GeoCoordinates geometry,
      @Json(name = "properties") GeoProperties properties
  ){}

  public record GeoCoordinates(
    @Json(name = "type") String type,  
    @Json(name = "coordinates") List<List<List<List<Double>>>> coords
      
  ){}

  public record GeoProperties(
      @Json(name = "state") String state,
      @Json(name = "city") String city,
      @Json(name = "name") String name,
      @Json(name = "holc_id") String holcId,
      @Json(name = "holc_grade") String holcGrade,
      @Json(name = "neighborhood_id") int neighborhood,
      @Json(name = "area_description_data") Map<String, String> areaDescription,
      @Json(name = "keyword_highlight") String highlight



  ){}
    
}
