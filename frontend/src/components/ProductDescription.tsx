import {useState} from "react"
import "../App.css"
import { getProduct } from "../data/getPrices"

// Created Interface to avoid have any as a type
interface IProduct  {
    productKey: string 
}

export const ProductDescription = ({productKey} : IProduct) => {
    const product = getProduct(productKey);
    const imageURL = product.image;

    return(
        <div className="product-description" role="product-description">
            <div>{product.value}</div>
            <img src={imageURL} className="product-image"/>
        </div>
    )
}