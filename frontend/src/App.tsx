import React, { useEffect, useState } from "react";
import "./App.css";
import {Currency, ProductDescription, Size} from  "./components"
import {SearchBar} from "./components"
import {SearchResults} from "./components"
import {siteName} from "../src/config"
import { Platforms } from "./components/Platforms";
import { NewSearchBar } from "./components/NewSearchBar";
import {IProduct} from "./data/getProductList"
import { Filter } from "./components/Filter";


function App() {

  const [productKey, setProductKey] = useState("");
  const [productList, setProductList] = useState([]);

  //      <SearchBar setProductKey={setProductKey}/>
  //       <ProductDescription productKey={productKey}/>


  return (
    <div className="app" id="appID" role="app">
      {siteName}
      <NewSearchBar setProductList = {setProductList}/>
      <Filter/>
      <SearchResults productList={productList}/>
    </div>
  );}

export default App;
