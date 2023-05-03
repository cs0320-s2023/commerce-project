import React, { useEffect, useState, useReducer, createContext} from "react";
import "./App.css";
import {Currency, ProductDescription, Size, wishlist} from  "./components"
import {SearchResults} from "./components"
import {siteName} from "../src/config"
import { Platforms } from "./components/Platforms";
import { NewSearchBar } from "./components/NewSearchBar";
import { Filter } from "./components/Filter";
import { GoogleSignIn } from "./components";
import {ErrorMessage} from "./components"
import {PriceStats} from "./components/"
import {reducer} from "./data/reducer";
import { defaultPageState, initialContext } from "./data/dataTypes";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


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
        {/* <Filter />
        <SearchResults />     */}
        <div className="results-filter" id="results-filter" role="results-filter">
          <Filter />
          <SearchResults />      
          <PriceStats />     
        </div> 
      </div>
    </PageContext.Provider>
  );}

export default App;
