import { mockSearch } from "../../../mockdata/search";
import { mockingMode } from "./mockingMode";
import { secretAPIkey } from "./apikey";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";
import { defaultPageState } from "./dataTypes";


const backendURL = "https://sneakers-real-time-pricing.p.rapidapi.com"
const options = {  
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': secretAPIkey,
    },          
  }

const backendURL2 = "http://localhost:3232"

export async function getProductList (searchText : string, dispatch : any)  {
    
    if (mockingMode) {

        console.log("getProductList.mockingmMode 1")

        const action = {
            type : "searchSuccess",
            payload : mockSearch.data,
        }
        dispatch(action) ;
        console.log("getProductList.mockingmMode 2")

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