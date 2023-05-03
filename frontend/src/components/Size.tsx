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
        <p className ="title-filter">Pick your size chart </p>

        {/* <Alert variant = "" className="title-sizes">Your Sizes:</Alert> */}
        <div className="list-container">
          {/* {sizes.map((size) => (
                        <div className = "one-currency">
>>>>>>> Stashed changes
                            <input value={size} type="checkbox" />
                            <span>{size} </span>
                        </div> */}
          {/* )) */}

          {sizes.map((size) => (
            <Switch className="filter-switch"
            key = {size}

            defaultChecked={true}
            checkedChildren={size}
            unCheckedChildren={size}
          ></Switch>
            )
          )}

        </div>
      </div>
    );

};

