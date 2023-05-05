import { useContext } from "react"
import { IPriceStat, mapProductPrice } from "../data/dataTypes"
import { getPriceStats } from "../data/getPriceStats"
import { PageContext } from "../App"

import "../App.css"
import { platform } from "os"

export const ProductPriceStats = ({sku}: any) => {

    const {pageState, dispatch} = useContext(PageContext);

    const getSelectedPriceStats = (sku: string) => {

        if ((sku == null) || (sku == undefined) || (sku.length == 0)) {
            return;
        } else {
            getPriceStats(sku, dispatch);
        }
    }

    // DEFENSIVE PROG: If no price stats list is defined yet, we return an empty div
    if ((mapProductPrice == null) || (mapProductPrice == undefined)){
        return <div/>
    }

    const priceAllStats = mapProductPrice.get(sku);

    if ((priceAllStats == null) || (priceAllStats == undefined)){
        return <div className="get-price-stats" onClick={() => getSelectedPriceStats(sku)}>Get price stats</div>
    }

    const filterPlatforms = (priceStat: IPriceStat) => {

            let selected = false;

            pageState.platforms.forEach ((platform) => {
                console.log("comparing " + priceStat.platformName + " with " + platform.name)

                if (priceStat.platformName == platform.name) 
                    //console.log("Found and platform selected = " + platform.selected)
                    selected = platform.selected;
                })

            return selected;
       }
    

    const priceStats = priceAllStats.filter(filterPlatforms)
    console.log(priceStats);
    
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

