import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import {mockSizes} from "../../../mockdata/sizes";

export const Size  = () => {

    const sizes = mockSizes.data;
    if (sizes == null) {
        return <div className="sizes-container">Loading Sizes</div>
    } 

    return(
            <div className="sizes-container" role="sizes-container">
                <div className="title-sizes">Your Sizes:</div>
                <div className="list-container">
                    {sizes.map((size) => (
                        <div className = "one-currency">
                            <input value={size} type="checkbox" />
                            <span>{size} </span>
                        </div>
                    ))}
                </div>
            </div>
    );

};

