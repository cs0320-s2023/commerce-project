import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import {mockCurrencies} from "../../../mockdata/currencies";
import { Container, Row, Col, Breadcrumb, ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import {Switch} from "antd"
import {Alert} from "react-bootstrap"

export const Currency  = () => {

    //const currencies = mockCurrencies.data;
    const currencies = mockCurrencies.currencies;

    if (currencies == null) {
        return <div className="currency-container">Loading Currencies</div>
    } 

    const [checked, setChecked] = useState(false);
    const [toggle, setToggle] = useState(false);



    return (
      <div className="currency-container" role="currency-container">
        <p className ="title-filter">Display prices in:</p>

        {/* <Alert variant = "" className ="title-currency">Display prices in:</Alert> */}
        <div className="list-container">
          {/* {currencies.map((currency) => (
            <div className="one-currency">
              <input value={currency} type="checkbox" />
              <span>{currency} </span>
            </div> */}

            
          {currencies.map((currency) => (
            <Switch className="filter-switch"
            key = {currency}
            defaultChecked={true}
            checkedChildren={currency}
            unCheckedChildren={currency}
          ></Switch>
            )
          )}

        </div>
      </div>

    );

};

