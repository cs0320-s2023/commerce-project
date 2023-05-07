import { useContext } from "react"
import { IPriceStat, mapProductPrice } from "../data/dataTypes"
import { getPriceStats } from "../data/getPriceStats"
import { PageContext } from "../App"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import "../App.css"

/**
 * Displays Product Price Stats.
 * @param sku: The SKU of the product whose Price Stats will be displayed.
 * @returns 
 */

// Shipping costs for each platform. Can be fetched in realtime from API later.
const aliasShippingCost = 14.50;
const hypeboostShippingCost = 10;
const kikikickzShippingCost = 4.90;
const klektShippingCost = 45;
const lacedShippingCost = 7;
const restocksShippingCost = 10;
const stockxShippingCost = 32.95;

export const ProductPriceStats = ({sku}: any) => {

    // Get the Page State and Reducer's dispatch function from the global PageContext
    const {pageState, dispatch} = useContext(PageContext);

    /**
     * Retrieves the Product's Price Stats from the backend.
     * @param sku Product SKU
     * @returns calls the back end which calls the reduced which add an entry to mapProductPrice
     */
    const getSelectedPriceStats = (sku: string) => {

        // Do nothing if the SKU is not valid.
        if ((sku == null) || (sku == undefined) || (sku.length == 0)) {
            return;

        // Get the price stats
        } else {
            getPriceStats(sku, dispatch);
        }
    }

    /**
     * Filtering function based on platforms
     * @param priceStat the stats associated with a platform
     * @returns True if the platform should be included.  False if it is filtered out
     */
    const filterPlatforms = (priceStat: IPriceStat) => {
        for (let platform of pageState.platforms) {
            if (priceStat.platformName == platform.name) 
                return platform.selected;
            }

        // We'll get here only if the platform returned by the price stats was not part of the recognized platforms.
        // Let us return a true so that the use can see it listed. 
        return false;
    }

    /**
     * Get the min and max of min/avg/last prices provided for this platform entry.
     * @param priceEntry: price entry for a platform
     * @returns [min, max]
     */
    const getEntryRange = (priceEntry: any) => {
        return [priceEntry.minPriceUsd, priceEntry.avgPriceUsd > priceEntry.maxPriceUsd? priceEntry.avgPriceUsd: priceEntry.maxPriceUsd]
    }

    const getEntryRangeWithShipping = (priceEntry: any) => {
        const min = (priceEntry.platformName === 'alias'
        ? priceEntry.minPriceUsd + aliasShippingCost
        : priceEntry.platformName === 'hypeboost'
        ? priceEntry.minPriceUsd + hypeboostShippingCost
        : priceEntry.platformName === 'stockx'
        ? priceEntry.minPriceUsd + stockxShippingCost
        : priceEntry.platformName === 'klekt'
        ? priceEntry.minPriceUsd + klektShippingCost
        : priceEntry.platformName === 'kikikickz'
        ? priceEntry.minPriceUsd + kikikickzShippingCost
        : priceEntry.platformName === 'laced'
        ? priceEntry.minPriceUsd + lacedShippingCost
        : priceEntry.platformName === 'restocks'
        ? priceEntry.minPriceUsd + restocksShippingCost
        : priceEntry.minPriceUsd);

        const max = (priceEntry.platformName === 'alias'
        ? priceEntry.maxPriceUsd + aliasShippingCost
        : priceEntry.platformName === 'hypeboost'
        ? priceEntry.maxPriceUsd + hypeboostShippingCost
        : priceEntry.platformName === 'stockx'
        ? priceEntry.maxPriceUsd + stockxShippingCost
        : priceEntry.platformName === 'klekt'
        ? priceEntry.maxPriceUsd + klektShippingCost
        : priceEntry.platformName === 'kikikickz'
        ? priceEntry.maxPriceUsd + kikikickzShippingCost
        : priceEntry.platformName === 'laced'
        ? priceEntry.maxPriceUsd + lacedShippingCost
        : priceEntry.platformName === 'restocks'
        ? priceEntry.maxPriceUsd + restocksShippingCost
        : priceEntry.maxPriceUsd);

        return [min, max]
    }


    // Once the backend returns data, the reducer will populate a map between the products and the price stats.
    // If no price stats list is defined yet, we return an empty div (Defensive Programmming)
    if ((mapProductPrice == null) || (mapProductPrice == undefined)){
        return <div/>
    }

    // If the backend sent the Product Price Stats, these will be in a map between the SKU and the Price Stats.
    const priceAllStats = mapProductPrice.get(sku);

    // If no Price Stats are available for this product, give the user a way to request them.
    if ((priceAllStats == null) || (priceAllStats == undefined)){
        return <button aria-label="Press Enter to get price stats" tabIndex={0} 
        className="get-price-stats" onClick={() => getSelectedPriceStats(sku)}>Get Price Stats</button>
    }

    // Filter out the selected platforms.
    const priceStats = priceAllStats.filter(filterPlatforms)


    // Calculate the min and max of all platforms.  This will be used to set a common range for 
    // the slide bars.
    let minRange = 999999;
    let maxRange = 0;
    priceStats.forEach( (priceEntry: any) => {
        minRange = (minRange < priceEntry.minPriceUsd)  ? minRange : priceEntry.minPriceUsd;
        maxRange = (maxRange > priceEntry.avgPriceUsd)  ? maxRange : priceEntry.avgPriceUsd;
        maxRange = (maxRange > priceEntry.maxPriceUsd) ? maxRange : priceEntry.maxPriceUsd;
    })
   
    return(
        <div className="price-stats-container" role="price-stats">
            <div className = "price-stats">
                <div className = "price-platform-column">Platform</div>
                <div className = "price-column-header">Range</div>
                <div className = "price-column-header">Min</div>
                <div className = "price-column-header">Avg</div>
                <div className = "price-column-header">Max</div>                
            </div>

             {priceStats.map((priceEntry : any) => (
                <div className = "price-stats" key = {priceEntry.platformName}>
                     <div className = "price-platform-column"> {priceEntry.platformName} </div>
                     <Box  className = "price-column">
                        <Slider 
                            getAriaLabel={() => 'Price Range Slider'}
                            min = {minRange * 0.95}
                            max = {maxRange * 1.15}
                            value={getEntryRangeWithShipping(priceEntry)}
                            valueLabelDisplay="auto"
                        />
                    </Box>

                     <div className = "price-column"> {priceEntry.platformName === 'alias'
                                                        ? priceEntry.minPriceUsd + aliasShippingCost
                                                        : priceEntry.platformName === 'hypeboost'
                                                        ? priceEntry.minPriceUsd + hypeboostShippingCost
                                                        : priceEntry.platformName === 'stockx'
                                                        ? priceEntry.minPriceUsd + stockxShippingCost
                                                        : priceEntry.platformName === 'klekt'
                                                        ? priceEntry.minPriceUsd + klektShippingCost
                                                        : priceEntry.platformName === 'kikikickz'
                                                        ? priceEntry.minPriceUsd + kikikickzShippingCost
                                                        : priceEntry.platformName === 'laced'
                                                        ? priceEntry.minPriceUsd + lacedShippingCost
                                                        : priceEntry.platformName === 'restocks'
                                                        ? priceEntry.minPriceUsd + restocksShippingCost
                                                        : priceEntry.minPriceUsd
                                                    }  </div>
                     <div className = "price-column"> {
                                                        priceEntry.platformName === 'alias'
                                                        ? priceEntry.avgPriceUsd + aliasShippingCost
                                                        : priceEntry.platformName === 'hypeboost'
                                                        ? priceEntry.avgPriceUsd + hypeboostShippingCost
                                                        : priceEntry.platformName === 'stockx'
                                                        ? priceEntry.avgPriceUsd + stockxShippingCost
                                                        : priceEntry.platformName === 'klekt'
                                                        ? priceEntry.avgPriceUsd + klektShippingCost
                                                        : priceEntry.platformName === 'kikikickz'
                                                        ? priceEntry.avgPriceUsd + kikikickzShippingCost
                                                        : priceEntry.platformName === 'laced'
                                                        ? priceEntry.avgPriceUsd + lacedShippingCost
                                                        : priceEntry.platformName === 'restocks'
                                                        ? priceEntry.avgPriceUsd + restocksShippingCost
                                                        : priceEntry.avgPriceUsd
                     }  
                     </div>
                     <div className = "price-column"> {
                                                        priceEntry.platformName === 'alias'
                                                        ? priceEntry.maxPriceUsd + aliasShippingCost
                                                        : priceEntry.platformName === 'hypeboost'
                                                        ? priceEntry.maxPriceUsd + hypeboostShippingCost
                                                        : priceEntry.platformName === 'stockx'
                                                        ? priceEntry.maxPriceUsd + stockxShippingCost
                                                        : priceEntry.platformName === 'klekt'
                                                        ? priceEntry.maxPriceUsd + klektShippingCost
                                                        : priceEntry.platformName === 'kikikickz'
                                                        ? priceEntry.maxPriceUsd + kikikickzShippingCost
                                                        : priceEntry.platformName === 'laced'
                                                        ? priceEntry.maxPriceUsd + lacedShippingCost
                                                        : priceEntry.platformName === 'restocks'
                                                        ? priceEntry.maxPriceUsd + restocksShippingCost
                                                        : priceEntry.maxPriceUsd                                    
                     } </div>
                 </div>
              ))}
         </div>        
        )
}
