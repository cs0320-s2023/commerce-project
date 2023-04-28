import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import ReactSearchBox from "react-search-box";
import {siteName} from "../config"
import {getProductList} from "../data/getProductList"
import { Platforms } from "./Platforms";
import { Currency } from "./Currency";
import { Size } from "./Size";

interface IProduct  {
    productKey: string 
}

export const Filter = ({setProductKey} : any) => { //todo

    return(
        <div className="filter-container" role="filter-container">
            <div className="filter" role="filter">
                <Platforms/>
                <Currency/>
                <Size/>
            </div>
        </div>
    );

};

