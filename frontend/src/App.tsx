import React, { useEffect, useState } from "react";
import "./App.css";
import {ProductDescription} from  "./components"
import {SearchBar} from "./components"
import {SearchResults} from "./components"
import {siteName} from "../src/config"


function App() {

  const [productKey, setProductKey] = useState("");

  return (
    <div className="app" id="appID" role="app">
      {siteName}
      <SearchBar setProductKey={setProductKey}/>
      <ProductDescription productKey={productKey}/>
      <SearchResults productKey={productKey}/>
    </div>
  );}

export default App;
