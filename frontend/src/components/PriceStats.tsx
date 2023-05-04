import { useContext } from "react"
import { PageContext } from "../App"
import {Card} from 'react-bootstrap'

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


    const closePrices = () => {
        console.log("closing");

    };

    return(
        // <div className="price-stats-container" role="price-stats">
        //     {priceStats.map((priceEntry : any) => (
        //         <div className = "price-stats" key = {priceEntry.platformName}>
        //             <div className = "price-platform-name"> {priceEntry.platformName} </div>
        //             <div className = "price-price"> Min: {priceEntry.minPriceUsd} </div>
        //             <div className = "price-price"> Avg: {priceEntry.avgPriceUsd} </div>
        //             <div className = "price-price"> Last: {priceEntry.lastPriceUsd} </div>
        //         </div>
        //      ))}
        // </div>
        <div>
         {/* <button className="prices-close-btn" onClick={closePrices}>Close Prices</button>
 
         <p className="message-with-prices"> Here are your prices 🤗 </p> */}
        <div className="price-stats-container" role="price-stats">
       
        {priceStats.map((priceEntry : any) => (
            <Card style={{ color: "#000" }} className = "price-stats-card" key = {priceEntry.platformName}>        
            <Card.Title className="product-name-card-title">{priceEntry.platformName}</Card.Title> 
                    <div className = "price-price"> Min: {priceEntry.minPriceUsd} </div>
                     <div className = "price-price"> Avg: {priceEntry.avgPriceUsd} </div>
                     <div className = "price-price"> Last: {priceEntry.lastPriceUsd} </div>
            </Card>
        ))}
        </div>
        </div>
    )
}

