import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import {mockCurrencies} from "../../../mockdata/currencies";

export const Currency  = () => {

    const currencies = mockCurrencies.data;
    if (currencies == null) {
        return <div className="platforms-container">Loading Currencies</div>
    } 

    return(
            <div className="currencies-container" role="currencies-container">
                <div className="title-currency">Your Currencies:</div>
                <div className="list-container">
                    {currencies.map((currency) => (
                        <div className = "one-currency">
                            <input value={currency} type="checkbox" />
                            <span>{currency} </span>
                        </div>
                    ))}
                </div>
            </div>
    );

};

