import { useContext } from "react"
import { mapProductPrice } from "../data/dataTypes"
import { getPriceStats } from "../data/getPriceStats"
import { PageContext } from "../App"

import "../App.css"

export const ProductPriceStats = ({sku}: any) => {

    const {pageState, dispatch} = useContext(PageContext);

    const getSelectedPriceStats = (sku: string) => {

        if ((sku == null) || (sku == undefined) || (sku.length == 0)) {
            return;
        } else {
            //handleOpenPanel()
            getPriceStats(sku, dispatch);
        }
    }

    // DEFENSIVE PROG: If no price stats list is defined yet, we return an empty div
    if ((mapProductPrice == null) || (mapProductPrice == undefined)){
        return <div/>
    }

    const priceStats = mapProductPrice.get(sku);

    if ((priceStats == null) || (priceStats == undefined)){
        return <div className="get-price-stats" onClick={() => getSelectedPriceStats(sku)}>Get price stats</div>
    }

    return(
        <div className="price-stats-container" role="price-stats">
            <div className = "price-stats">
                <div className = "price-column-header"> </div>
                <div className = "price-column-header"> Min </div>
                <div className = "price-column-header"> Avg </div>
                <div className = "price-column-header"> Last </div>                
            </div>

             {priceStats.map((priceEntry : any) => (
                <div className = "price-stats" key = {priceEntry.platformName}>
                     <div className = "price-column-header"> {priceEntry.platformName} </div>
                     <div className = "price-column"> {priceEntry.minPriceUsd} </div>
                     <div className = "price-column"> {priceEntry.avgPriceUsd} </div>
                     <div className = "price-column"> {priceEntry.lastPriceUsd} </div>
                 </div>
              ))}
         </div>        
        )
}

