import { FeatureCollection } from "geojson";
import { FillLayer, LineLayer } from "react-map-gl";

// Import the raw JSON file
import rl_data from "./geodata/fullDownload.json"; 
import { APIResponse, isSuccessResponse, isErrorResponse } from "./utils/APIResponse";
// you may need to rename the donwloaded .geojson to .json

export function isFeatureCollection(json: any): json is FeatureCollection {
  return json.type === "FeatureCollection";
}

/**
 * getting data from the backend server api
 * @param url 
 * @returns 
 */
export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    // TOOD: This is of type "any" by default. Danger! Suggest adding a dynamic check in a full example
    const responseJson: APIResponse =
      await response.json();
    // Using Type Predicate to veriy that responseJson is a APIResponse.
    if (isSuccessResponse(responseJson)) {
      return responseJson.data;
    } 
    else if (isErrorResponse(responseJson)) {
      console.log("Got a Failed Server Error Response");
    } 
    else {
      console.log(
        "Error: Json returned is not of of proper type."
      );
    }
  } catch (e) {
    console.log(e);
  }
};


/**
 * overlay on startup
 * @returns 
 */
export function overlayData(): Promise<GeoJSON.FeatureCollection | undefined> {
  let maxLat = 90;
  let minLat = -90;
  let maxLon = 180;
  let minLon = -180;

  const url = `http://localhost:3232/bounds?maxLat=${maxLat}&minLat=${minLat}&maxLon=${maxLon}&minLon=${minLon}`;

  let result = fetchData(url).then((r) => {
    return isFeatureCollection(r) ? r : undefined;
  });
  return result;
}



const propertyName = "holc_grade";

export const geoLayer: FillLayer = {
  id: "geo_data",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", propertyName],
      "A",
      "#5bcc04",
      "B",
      "#04b8cc",
      "C",
      "#e9ed0e",
      "D",
      "#d11d1d",
      "#ccc",
    ],
    "fill-opacity": 0.2,
  },
};

export const geoLayerLine: LineLayer = {
  id: "geo_data2",
  type: "line",
  paint: {
    "line-color": "#d11d1d",
    "line-width": 1,
  },
};

