import React, { useEffect, useState } from "react";
import "./App.css";
import {ProductDescription} from  "./components"
import {SearchBar} from "./components"
import {SearchResults} from "./components"
import {siteName} from "../src/config"


function App() {
  return (
    <div className="app" id="appID" role="app">
      {siteName}
      <SearchBar/>
      <ProductDescription/>
      <SearchResults/>
    </div>
  );}

export default App;
