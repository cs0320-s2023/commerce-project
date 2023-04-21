import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import ReactSearchBox from "react-search-box";
import {siteName} from "../config"
import {getProductList, getData} from "../data/getProductList"
import Fuse from "fuse.js";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactNode,
  useRef,
} from "react";

// const fuseConfigsDefault = {
//     /**
//      * At what point does the match algorithm give up. A threshold of 0.0
//      * requires a perfect match (of both letters and location), a threshold
//      * of 1.0 would match anything.
//      */
//     threshold: 1.0,
//     /**
//      * Determines approximately where in the text is the pattern expected to be found.
//      */
//     location: 0,
//     /**
//      * Determines how close the match must be to the fuzzy location
//      * (specified by location). An exact letter match which is distance
//      * characters away from the fuzzy location would score as a complete
//      * mismatch. A distance of 0 requires the match be at the exact
//      * location specified, a distance of 1000 would require a perfect
//      * match to be within 800 characters of the location to be found
//      * using a threshold of 0.8.
//      */
//     distance: 100,
//     /**
//      * When set to include matches, only the matches whose length exceeds this
//      * value will be returned. (For instance, if you want to ignore single
//      * character index returns, set to 2).
//      */
//     minMatchCharLength: 1,
//     /**
//      * List of properties that will be searched. This supports nested properties,
//      * weighted search, searching in arrays of strings and objects.
//      */
//     keys: ["value"],
//     //tokenize: "exact",
// };


  /**
   * These configs are from Fuse plugin. Check out http://fusejs.io/
   * for more details.
   */
  const defaultFuseConfigs = {
    /**
     * At what point does the match algorithm give up. A threshold of 0.0
     * requires a perfect match (of both letters and location), a threshold
     * of 1.0 would match anything.
     */
    threshold: 0.00,
    /**
     * Determines approximately where in the text is the pattern expected to be found.
     */
    location: 0,
    /**
     * Determines how close the match must be to the fuzzy location
     * (specified by location). An exact letter match which is distance
     * characters away from the fuzzy location would score as a complete
     * mismatch. A distance of 0 requires the match be at the exact
     * location specified, a distance of 1000 would require a perfect
     * match to be within 800 characters of the location to be found
     * using a threshold of 0.8.
     */
    distance: 10000000,
    /**
     * When set to include matches, only the matches whose length exceeds this
     * value will be returned. (For instance, if you want to ignore single
     * character index returns, set to 2).
     */
    minMatchCharLength: 1,
    /**
     * List of properties that will be searched. This supports nested properties,
     * weighted search, searching in arrays of strings and objects.
     */
    keys: ["value"],
    tokenize: true, // split search query into tokens
    matchAllTokens: true,
  };

export const SearchBar = () => {

    const productList = getProductList()

    return(
        <div className="search-bar-container" role="search-bar-container">
            <div className="search-bar" role="search-bar">
                <ReactSearchBox
                    placeholder={`Search ${siteName}`}
                    data={productList}
                    fuseConfigs={defaultFuseConfigs}
                    onSelect={(record: any) => console.log(record)}
                    onFocus={() => {
                        console.log("This function is called when is focussed");
                    }}
                    //onChange={(value) => handleChange(value)}
                    onChange={(value) => console.log(value)}
                    
                    autoFocus
                    leftIcon={<>👟</>}
                    iconBoxSize="48px"
                />
            </div>
        </div>
    )
}