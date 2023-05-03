import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import { retrievePlatforms } from "../data/getPlatforms";
import {Alert} from "react-bootstrap"
import {Switch} from "antd";

export const Platforms  = () => {

    // const platforms = mockPlatforms.data;
    const platforms = retrievePlatforms();
    
    if (platforms == null) {
        return <Alert variant = "" className="platforms-container">Loading Platforms!</Alert>
    } 

    return (
      <div className="platforms-container" role="platforms-container">
        <Alert variant = "" className="title">Your Platforms:</Alert>
        <div className="list-container">
          {/* {platforms.map((platform) => (
                        <div className = "one-platform" key={platform.id}>
                            <input value={platform.name} type="checkbox" />
                            <span>{platform.name} </span>
                        </div>
                    ))} */}
          <Switch
            defaultChecked={true}
            checkedChildren="stockx"
            unCheckedChildren="stockx"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="alias"
            unCheckedChildren="alias"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="restocks"
            unCheckedChildren="restocks"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="hypeboost"
            unCheckedChildren="hypeboost"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="klekt"
            unCheckedChildren="klekt"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="kikikickz"
            unCheckedChildren="kikikicz"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="laced"
            unCheckedChildren="laced"
          ></Switch>
        </div>
      </div>
    );

};

