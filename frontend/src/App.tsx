import React, { useEffect, useState, useReducer, createContext} from "react";
import "./App.css";
import {Currency, ProductDescription, Size} from  "./components"
import {SearchResults} from "./components"
import {siteName} from "../src/config"
import { Platforms } from "./components/Platforms";
import { NewSearchBar } from "./components/NewSearchBar";
import { Filter } from "./components/Filter";
import { GoogleSignIn } from "./components";
import {ErrorMessage} from "./components/ErrorMessage"
import {reducer} from "./data/reducer";
import { defaultPageState, initialContext } from "./data/dataTypes";

export const PageContext = createContext(initialContext);

function App() {

  // Ignore the red underlining for now
  const [pageState, dispatch] = useReducer(reducer, defaultPageState);

  return (
    <PageContext.Provider value = {{ pageState, dispatch}}>
      <div className="app" id="appID" role="app">
        {siteName}
        <ErrorMessage />
        <GoogleSignIn />
        <NewSearchBar />
        <Filter />
        <SearchResults />      
      </div>
    </PageContext.Provider>
  );}

export default App;
