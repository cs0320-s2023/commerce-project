import {useState,} from "react";

import "../App.css";
import { fetchData, isFeatureCollection } from "../overlays";
import { APIResponse } from "../utils/APIResponse";
import { getAPIResponse } from "./BoundsInputBox";

export const submit_button_text = "Submit";

export interface QueryBoxProps {
    setState: (data: GeoJSON.FeatureCollection | undefined) => void;
  }
  
/**
 * initial state of the of query box
 * @param param0 
 * @returns 
 */
  export default function QueryBox({ setState }: QueryBoxProps) {
    const [boxState, setBoxState] = useState({keyword: "",});
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setBoxState({
        ...boxState,
        [e.target.name]: value,
      });
    };
  
    const [responseMessage, setResponseMessage] = useState("");
    
    /**
     * handles the highlighting of areas based on the query via api call
     * also outputs a success or error message based on the query
     * @param e 
     * @returns 
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      let userInput = boxState.keyword.trim(); 
      let keyword = userInput.split(" ");
  
      if (userInput === "") {
        setResponseMessage("no keyword was entered. please enter a keyword!");
      }

      if (!boxState.keyword.replace(/\s/g, "").length) return;

      if (keyword.length > 1) {
        setResponseMessage("only one keyword is allowed");
      }

      
      
      
       
      else {
        let url = `http://localhost:3232/query?keyword=${keyword}`;
        let response: APIResponse = await getAPIResponse(url);


        if (response.result === "error_bad_request") {
            setResponseMessage(response.message);
          } else {
            setResponseMessage("Success! Check out the map!");
          }
  
        const data = await Promise.resolve(fetchData(url));
        if (isFeatureCollection(data)) {
          setState(data);
        }
      }
    };
  
    return (
      <form onSubmit={handleSubmit} 
            role="form" 
            className="form-container"
            aria-label={"query form"}
            >
        <label>
          Keyword Search
          <input
            type="text"
            name="keyword"
            role={"keywordbox"}
            aria-label={"keyword goes here"}
            value={boxState.keyword}
            onChange={handleInputChange}
          />
        </label>
  
        <button
          className="repl-button"
          type="submit"
          role="querybutton"
          aria-label={submit_button_text}
        >
          Submit Query
        </button>
        <p role= "querymessage" className="response-message">Message: {responseMessage} </p>
      </form>
    );
  }