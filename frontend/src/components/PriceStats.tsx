import { useContext } from "react"
import { PageContext } from "../App"

import "../App.css"

export const PriceStats = () => {

    const {pageState} = useContext(PageContext);

    // DEFENSIVE PROG: If no pageState  is defined yet, we return an empty div
    if ((pageState == null) || (pageState == undefined)){
        return <div/>
    } 
    const priceStats = pageState.selectedProductPriceStats;

    // DEFENSIVE PROG: If no price stats list is defined yet, we return an empty div
    if ((priceStats == null) || (priceStats == undefined)){
        return <div/>
    } 

    return(
        <div className="price-stats-container" role="price-stats">
            {priceStats.map((priceEntry : any) => (
                <div className = "price-stats" key = {priceEntry.platformName}>
                    <div className = "price-platform-name"> {priceEntry.platformName} </div>
                    <div className = "price-price"> Min: {priceEntry.minPriceUsd} </div>
                    <div className = "price-price"> Avg: {priceEntry.avgPriceUsd} </div>
                    <div className = "price-price"> Last: {priceEntry.lastPriceUsd} </div>
                </div>
             ))}
        </div>
    )
}

