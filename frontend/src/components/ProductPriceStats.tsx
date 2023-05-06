import { useContext } from "react"
import { IPriceStat, mapProductPrice } from "../data/dataTypes"
import { getPriceStats } from "../data/getPriceStats"
import { PageContext } from "../App"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import "../App.css"
import { platform } from "os"
import { getCommentRange } from "typescript";

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

    const getEntryRange = (priceEntry: any) => {
        return [priceEntry.minPriceUsd, priceEntry.avgPriceUsd > priceEntry.lastPriceUsd? priceEntry.avgPriceUsd: priceEntry.lastPriceUsd]
    }


    let minRange = 100000;
    let maxRange = 0;
    priceStats.forEach( (priceEntry: any) => {
        minRange = (minRange < priceEntry.minPriceUsd)? minRange : priceEntry.minPriceUsd;
        maxRange = (maxRange > priceEntry.avgPriceUsd) ? maxRange: priceEntry.avgPriceUsd;
        maxRange = (maxRange > priceEntry.lastPriceUsd) ? maxRange: priceEntry.lastPriceUsd;
    })
   
    return(
        <div className="price-stats-container" role="price-stats">
            <div className = "price-stats">
                <div className = "price-platform-column">Platform</div>
                <div className = "price-column-header"> Range </div>
                <div className = "price-column-header"> Min </div>
                <div className = "price-column-header"> Avg </div>
                <div className = "price-column-header"> Last </div>                
            </div>

             {priceStats.map((priceEntry : any) => (
                <div className = "price-stats" key = {priceEntry.platformName}>
                     <div className = "price-platform-column"> {priceEntry.platformName} </div>
                     <Box  className = "price-column">
                        <Slider 
                            getAriaLabel={() => 'Price Range range'}
                            min = {minRange * 0.95}
                            max = {maxRange * 1.05}
                            value={getEntryRange(priceEntry)}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                     <div className = "price-column"> {priceEntry.minPriceUsd} </div>
                     <div className = "price-column"> {priceEntry.avgPriceUsd} </div>
                     <div className = "price-column"> {priceEntry.lastPriceUsd} </div>
                 </div>
              ))}
         </div>        
        )
}

