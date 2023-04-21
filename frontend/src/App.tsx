import React, { useEffect, useState } from "react";
import "./App.css";
import {ProductDescription} from  "./components"
import {SearchBar} from "./components"
import {SearchResults} from "./components"


function App() {
  return (
    <div className="app" id="appID" role="app">
      Initial app
      <SearchBar/>
      <ProductDescription/>
      <SearchResults/>
    </div>
  );}

export default App;
