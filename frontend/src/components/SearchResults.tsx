import {useContext, useState} from "react"
import "../App.css"
import { getPrices } from "../data/getPrices"
import { PageContext } from "../App"


export const SearchResults = () => {

    const {pageState} = useContext(PageContext);
    const productList = pageState?.productList;

    if (productList == null) {
        console.log("productList == null")
        return <div/>
    } 
    console.log("productList is not null")
    console.log(productList)

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

