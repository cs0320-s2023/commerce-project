import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import {mockSizes} from "../../../mockdata/sizes";
import {Switch} from "antd"
import {Alert} from "react-bootstrap"

export const Size  = () => {

    const sizes = mockSizes.data;
    if (sizes == null) {
        return <div className="sizes-container">Loading Sizes</div>
    } 

    return (
      <div className="sizes-container" role="sizes-container">
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

