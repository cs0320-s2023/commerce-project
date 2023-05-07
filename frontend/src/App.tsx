import React, { useEffect, useState, useReducer, createContext } from "react";
import "./App.css";
import { SearchResults } from "./components";
import { siteName } from "../src/config";
import { Platforms } from "./components/Platforms";
import { NewSearchBar } from "./components/NewSearchBar";
import { GoogleSignIn } from "./components";
import { ErrorMessage } from "./components";
import { PriceStats } from "./components/";
import { reducer } from "./data/reducer";
import { defaultPageState, initialContext } from "./data/dataTypes";

export const PageContext = createContext(initialContext);

function App() {
  // Ignore the red underlining for now
  const [pageState, dispatch] = useReducer(reducer, defaultPageState);

  const username = localStorage.getItem("name");

//  const signedIn = username != undefined && username.length > 0;  // Good one
  const signedIn = true;  // Safae test

  return (
    <PageContext.Provider value={{ pageState, dispatch }}>
      <div className="app" id="appID" role="app">
        <h1 className="webpage-title">👟{siteName}👟</h1>

        <h3 className="webpage-subtitle">
          Find the shoe that fits your foot... and your budget!
        </h3>
        <h3 className="webpage-subtitle">
          No more hidden fees or taxes 🤑. Prices you see are what you pay 😀.
        </h3>

        <ErrorMessage />
        <GoogleSignIn />

        {signedIn ? (
          <>
            <NewSearchBar />
            <PriceStats />
            <div
              className="results-filter"
              id="results-filter"
              role="results-filter"
            >
              <Platforms />
              <SearchResults />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </PageContext.Provider>
  );
}

export default App;