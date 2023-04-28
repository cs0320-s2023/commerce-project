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
import { auth, signInWithGoogle, signOutWithGoogle} from "./firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";



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
   
      
      <button onClick={signInWithGoogle} className="google-btn">
      <span className="google-text">Sign in!</span>
      <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
      </button>

      <p className="welcome-message"> Welcome {localStorage.getItem('name') ? localStorage.getItem('name') : 'Please sign in'}!</p>


      <button onClick={signOutWithGoogle} className="signout-btn">
      <span className="signout-text">Sign Out!</span>
      </button>
    </div>

  );}

export default App;
