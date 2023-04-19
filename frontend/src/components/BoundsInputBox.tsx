import {useState,} from "react";

import "../App.css";
import { fetchData, isFeatureCollection } from "../overlays";
import { APIResponse } from "../utils/APIResponse";

export const submit_button_text = "Submit";

/**
 * getter for the API response
 * @param url 
 * @returns 
 */
export async function getAPIResponse(url: string): Promise<APIResponse> {
    const response: Response = await fetch(url);
    const responseJson: APIResponse = await response.json();
    return responseJson;
  }

interface BoundsProps {
    setState: (data: GeoJSON.FeatureCollection | undefined) => void;
  }
/**
 * default state of the bounds box
 * @param param0 
 * @returns 
 */
  export default function Boxes({ setState }: BoundsProps) {
    const [boxState, setBoxState] = useState({
      maxLat: 90,
      minLat: -90,
      maxLon: 180,
      minLon: -180,
    });

/**
 * shortcut keys for the map
 * @param event 
 */
// ctrl + r to reset the map
    async function handleKeyDown(event: KeyboardEvent) {
        if (event.ctrlKey) {
            if (event.key === 'r') {
                setResponseMessage("Map was reset!");
                setBoxState({
                    maxLat: 90,
                    minLat: -90,
                    maxLon: 180,
                    minLon: -180,});
                    const url = `http://localhost:3232/bounds?maxLat=90&minLat=-90&maxLon=180&minLon=-180`;
                    const data = await Promise.resolve(fetchData(url));
                    
                    if (isFeatureCollection(data)) {
                        setState(data);
                    }; 
        }
        // ctrl + d to see in to detroit
        if (event.key === 'd') {
            setBoxState({
                maxLat: 42.512096,
                minLat: 42.020223,
                maxLon: -82.297897,
                minLon: -83.484421,});
        }
    }
}
    window.addEventListener('keydown', handleKeyDown);
/**
 * handles input change in the input boxes
 * @param e 
 */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setBoxState({ ...boxState, [e.target.name]: value,});
      };

    const [responseMessage, setResponseMessage] = useState("");

/**
 * handles the api calls for boundary filtering and error handling when clicking submit
 * @param e 
 */
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let { maxLat, minLat, maxLon, minLon } = { ...boxState };

    const url = `http://localhost:3232/bounds?maxLat=${maxLat}&minLat=${minLat}&maxLon=${maxLon}&minLon=${minLon}`;
    let response: APIResponse = await getAPIResponse(url);

    const data = await Promise.resolve(fetchData(url));
    
    if (response.result === "error_bad_request") {
        setResponseMessage(response.message);
      } else {
        setResponseMessage("Success! Check out the map!");
      }


    if (isFeatureCollection(data)) {
        setState(data);
    }
    };






    return (
        <form onSubmit={handleSubmit} role="formsubmit" className="form-container" id="formID">
          <label>
            Minimum Latitude
            <input
              type="text"
              name="minLat"
              role={"minLat"}
              aria-label={"minimum latitude goes here"}
              value={boxState.minLat}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Maximum Latitude
            <input
              type="text"
              name="maxLat"
              role={"maxLat"}
              aria-label={"maximum latitude goes here"}
              value={boxState.maxLat}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Minimum Longitude
            <input
              type="text"
              name="minLon"
              role={"minLon"}
              aria-label={"minimum longitude goes here"}
              value={boxState.minLon}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Maximum Longitude
            <input
              type="text"
              name="maxLon"
              role={"maxLon"}
              aria-label={"maximum longitude goes here"}
              value={boxState.maxLon}
              onChange={handleInputChange}
            />
          </label>
          <button
            className="bounds-button"
            type="submit"
            role="boundsbutton"
            aria-label={"submit bounds"}
          >
            Submit Bounds
          </button>
          <p role= "boundsmessage" className="response-message">Message: {responseMessage} </p>

        </form>
        
    )}




