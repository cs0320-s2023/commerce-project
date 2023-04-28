import {useState} from "react"
import "../App.css"
import { getPrices } from "../data/getPrices"
import {IProduct} from "../data/getProductList"


export const SearchResults = ({productList} : any) => {
    return(
        <div className="search-results" role="search-results">
            {productList.map((product : any) => (
                <div className = "product" key = {product.name}>
                    <img src={product.image} className="product-image"/>
                    <div className = "product-name"> {product.name} </div>
                </div>
             ))}
        </div>
    )
}

