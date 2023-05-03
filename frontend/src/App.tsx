import React, { useEffect, useState, useReducer, createContext} from "react";
import "./App.css";
import {Currency, ProductDescription, Size} from  "./components"
// import {SearchBar} from "./components"
import {SearchResults} from "./components"
import {siteName} from "../src/config"
import { Platforms } from "./components/Platforms";
import { NewSearchBar } from "./components/NewSearchBar";
import { Filter } from "./components/Filter";
import { auth, signInWithGoogle, signOutWithGoogle} from "./firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleSignIn } from "./components";
import {ErrorMessage} from "./components/ErrorMessage"
import {reducer} from "./data/reducer";
import { defaultPageState } from "./data/dataTypes";

export const PageContext = createContext(null);

function App() {

  const [pageState, dispatch] = useReducer(reducer, defaultPageState);


//  useEffect(() => {
//    console.log("useEffect called")
//  }, [pageState]);

//   const setPageState = useCallback((t: any) => {
//     setPageState2((t) => {return t});
//   }, [pageState]);

//   const setProductList = useCallback((productList: any) => {
//     setPageState2((t) => {return {
//         ...t, 
//         productList: productList,
//         errorMessage: ""}});
//   }, [pageState]);
  
//   const setErrorMessage = useCallback((message: string) => {
//     setPageState2((t) => {return {
//       ...t, 
//       productList: [],
//       errorMessage: message}});
// }, [pageState]);


  return (
    <PageContext.Provider value = {{ pageState, dispatch}}>
      <div className="app" id="appID" role="app">
        {siteName}
        <ErrorMessage/>
        <GoogleSignIn/>
        <NewSearchBar/>
        <Filter/>
        <SearchResults/>      
      </div>
    </PageContext.Provider>
  );}

export default App;
