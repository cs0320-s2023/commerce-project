import { useContext } from "react"
import { PageContext } from "../App"
import { getPriceStats } from "../data/getPriceStats"

import "../App.css"

export const SearchResults = () => {

    const {pageState, dispatch} = useContext(PageContext);

    // DEFENSIVE PROG: If no pageState  is defined yet, we return an empty div
    if ((pageState == null) || (pageState == undefined)){
        return <div/>
    } 
    const productList = pageState.productList;

    // DEFENSIVE PROG: If no product list is defined yet, we return an empty div
    if ((productList == null) || (productList == undefined)){
        return <div/>
    } 

    const getSelectedPriceStats = (sku: string) => {

        if ((sku == null) || (sku == undefined) || (sku.length == 0)) {
            return;
        } else {
            getPriceStats(sku, dispatch);
        }
    }

    return(
        <div className="search-results" role="search-results">
            {productList.map((product : any) => (
                <div className = "product" key = {product.name} onClick={() => {getSelectedPriceStats(product.sku)}}>
                    <img src={product.image} className="product-image"/>    

                    <div className = "name+like"> 
                        <button className = "wishlist-btn"> ❤️ </button>
                        <div className = "product-name"> {product.name} </div>

                    </div>

                </div>
             ))}
        </div> 
    )
}

