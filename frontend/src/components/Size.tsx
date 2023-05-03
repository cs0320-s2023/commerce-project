import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import {mockSizes} from "../../../mockdata/sizes";
import {Switch} from "antd"
import {Alert} from "react-bootstrap"

export const Size  = () => {

    const sizes = mockSizes.data;
    if (sizes == null) {
        return <div className="size-container">Loading Sizes</div>
    } 

    return (
      <div className="size-container" role="size-container">
        <Alert variant = "" className="title-sizes">Your Sizes:</Alert>
        <div className="list-container">
          {/* {sizes.map((size) => (
                        <div className = "one-currency">
>>>>>>> Stashed changes
                            <input value={size} type="checkbox" />
                            <span>{size} </span>
                        </div> */}
          {/* )) */}
          <Switch
            defaultChecked={true}
            checkedChildren="EU"
            unCheckedChildren="EU"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="JP"
            unCheckedChildren="JP"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="UK"
            unCheckedChildren="UK"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="US"
            unCheckedChildren="US"
          ></Switch>
        </div>
      </div>
    );

};

