import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import { retrievePlatforms } from "../data/getPlatforms";
import {Alert} from "react-bootstrap"

export const Platforms  = () => {

    // const platforms = mockPlatforms.data;
    const platforms = retrievePlatforms();
    
    if (platforms == null) {
        return <Alert variant = "" className="platforms-container">Loading Platforms!</Alert>
    } 

    return(
            <div className="platforms-container" role="platforms-container">
                <div className="title">Your Platforms:</div>
                <div className="list-container">
                    {platforms.map((platform) => (
                        <div className = "one-platform" key={platform.id}>
                            <input value={platform.name} type="checkbox" />
                            <span>{platform.name} </span>
                        </div>
                    ))}
                </div>
            </div>
    );

};

