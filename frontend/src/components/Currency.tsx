import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import {mockCurrencies} from "../../../mockdata/currencies";
import { Container, Row, Col, Breadcrumb, ButtonGroup, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import {Switch} from "antd"
import {Alert} from "react-bootstrap"

export const Currency  = () => {

    const currencies = mockCurrencies.data;
    if (currencies == null) {
        return <div className="platforms-container">Loading Currencies</div>
    } 

    const [checked, setChecked] = useState(false);
    const [toggle, setToggle] = useState(false);



    return (
      <div className="currencies-container" role="currencies-container">
        <Alert variant = "" className ="title-currency">Your Currencies:</Alert>
        <div className="list-container">
          {/* {currencies.map((currency) => (
            <div className="one-currency">
              <input value={currency} type="checkbox" />
              <span>{currency} </span>
            </div> */}

          <ButtonGroup>
            <ToggleButton
              id="toggle-checkbox"
              type="checkbox"
              variant="outline-primary"
              checked={checked}
              value="1"
              onChange={(e) => {
                setChecked(e.currentTarget.checked);
              }}
            >
              Check
            </ToggleButton>
          </ButtonGroup>
          <Switch
            defaultChecked={true}
            checkedChildren="EUR"
            unCheckedChildren="EUR"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="GDP"
            unCheckedChildren="GDP"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="USD"
            unCheckedChildren="USD"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="PLN"
            unCheckedChildren="PLN"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="CHF"
            unCheckedChildren="CHF"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="DKK"
            unCheckedChildren="SEK"
          ></Switch>
          <Switch
            defaultChecked={true}
            checkedChildren="CHF"
            unCheckedChildren="CHF"
          ></Switch>

          <Breadcrumb>
            <Breadcrumb.Item>currency1</Breadcrumb.Item>
            <Breadcrumb.Item>currency2</Breadcrumb.Item>
            <Breadcrumb.Item active>currency3</Breadcrumb.Item>
            <Breadcrumb.Item active>currency4</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

    );

};

