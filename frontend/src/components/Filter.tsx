import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import ReactSearchBox from "react-search-box";
import {siteName} from "../config"
import {getProductList} from "../data/getProductList"
import { Platforms } from "./Platforms";
import { Currency } from "./Currency";
import { Size } from "./Size";
import {Row, Col, Container} from "react-bootstrap"

interface IProduct  {
    productKey: string 
}

export const Filter = ({setProductKey} : any) => { //todo

    return (
      <div className="filter-container" role="filter-container">
        <Container>
          <Row>
            <div className="filter" role="filter">
              <Col>
                <Platforms />
              </Col>
              <Col>
                <Currency />
              </Col>
              <Col>
                <Size />
              </Col>
            </div>
          </Row>
        </Container>
      </div>
    );

};

