import { mockPriceStats } from "../../../mockdata/priceStats";
import { mockingMode } from "./mockingMode";
import { secretAPIKey } from "./apikey";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";


const backendURL = "https://sneakers-real-time-pricing.p.rapidapi.com"
const options = {  
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': secretAPIKey,
    },          
  }


const backendURL2 = "http://localhost:3232"

export async function getPriceStats (sku : string, dispatch : any)  {
    
    if (mockingMode) {

        const action = {
            type : "priceStatsSuccess",
            payload : mockPriceStats.data,
            sku: sku
        }
        dispatch(action) ;

    } else {

        const url = backendURL + "/sneakers/prices_stats?sku=" + sku;

        await fetch(url, options)
            .then(res => res.json())
            .then((result) => {
                if (isServerSuccessResponse(result)) {
                    const action = {
                        type : "priceStatsSuccess",
                        payload : result.data,
                        sku: sku
                    };
                    dispatch(action) ;
                

                } else if (isServerErrorResponse(result)) {
                    const action = {
                        type : "priceStatsFailure",
                        payload : result.message
                    }; 
                    dispatch(action) ;
                

                } else {
                    const action = {
                        type : "priceStatsFailure",
                        payload : "Error while trying to contact server for prices stats"
                    };
                    dispatch(action) ;
                  
                }
            },
            (error) => {
             
                const action = {
                    type : "priceStatsFailure",
                    payload : error
                };

                dispatch(action) ;
            }
    )

    }
}