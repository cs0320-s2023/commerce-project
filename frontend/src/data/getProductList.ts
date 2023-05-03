import { mockSearch } from "../../../mockdata/search";
import { mockingMode } from "./mockingMode";
import { secretAPIkey } from "./apikey";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";


const backendURL = "https://sneakers-real-time-pricing.p.rapidapi.com"
const options = {  
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': secretAPIkey,
    },          
  }

export interface IProduct {
    id: string,
    name: string,
    sku: string,
    image: string | null,
}
const backendURL2 = "http://localhost:3232"

export async function getProductList (searchText : string, dispatch : any)  {
    
    if (mockingMode) {

        const action = {
            type : "searchSuccess",
            payload : mockSearch.data,
        }
        dispatch(action) ;

    } else {

        const url = backendURL + "/sneakers?extended=true&name=" + searchText;

        await fetch(url, options)
            .then(res => res.json())
            .then((result) => {
                if (isServerSuccessResponse(result)) {
                    const action = {
                        type : "searchSuccess",
                        payload : result.data
                    };

                    console.log("Payload = " + action.payload)
                    dispatch(action) ;
                

                } else if (isServerErrorResponse(result)) {
                    const action = {
                        type : "searchFailure",
                        payload : result.message
                    }; 
                    dispatch(action) ;
                

                } else {
                    const action = {
                        type : "searchFailure",
                        payload : "Error while trying to contact server"
                    };
                    dispatch(action) ;
                  
                }
            },
            (error) => {
             
                const action = {
                    type : "searchFailure",
                    payload : error
                };

                dispatch(action) ;
            }
    )

    }
}