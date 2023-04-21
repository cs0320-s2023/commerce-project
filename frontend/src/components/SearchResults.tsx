import {useState} from "react"
import "../App.css"
import { getPrices } from "../data/getPrices"
// Created Interface to avoid have any as a type
interface IProduct  {
    productKey: string 
}

export const SearchResults = ({productKey} : IProduct) => {

    const searchResult = getPrices(productKey);


    return(
        <div className="search-results" role="search-results">
            {searchResult.map((product) => (
                <div className = "product-option" key = {product.vendor}>
                    <div className="product-vendor">{product.vendor}</div>
                    <div className="product-price">{product.price}</div>
                </div>
             ))}
        </div>
    )
}

