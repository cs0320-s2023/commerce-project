import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import ReactSearchBox from "react-search-box";
import {siteName} from "../config"
import {getProductList} from "../data/getProductList"

interface IProduct  {
    productKey: string 
}

export const NewSearchBar  = ({setProductList} : any) => {

    const [textSearch, setTextSearch] = useState("");

    const searchForSneakers = () => {
        const cleanTextSearch= textSearch.trim();
        if (cleanTextSearch.length == 0) {
            return;
        } else {
            getProductList(cleanTextSearch, setProductList);
        }
    }

    return(
    <div className="new-search-bar">
        <input
            className = "input-search-box"
            role = "input-search-box"
            type="text"
            id="header-search"
            placeholder="Search Sneakers"
            onChange = {(event) => {setTextSearch(event.target.value)}}
        />
        <button 
        className = "button-search-box"
        onClick = {searchForSneakers}
        type="submit">
            Search
        </button>
    </div>
    )
};


