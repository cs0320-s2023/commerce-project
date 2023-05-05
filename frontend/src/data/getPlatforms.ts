import {mockingMode} from "./mockingMode";
import {mockPlatforms} from "../../../mockdata/platforms";
import { secretAPIkey } from "./apikey";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";
import { IPlatform } from "./dataTypes";
import { platform } from "os";


const backendURL = "https://sneakers-real-time-pricing.p.rapidapi.com"
const options = {  
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': secretAPIkey,
    },          
  }

export async function retrievePlatforms (platforms: IPlatform[], dispatch : any) {

    if ((platforms != null) && (platforms != undefined) && (platforms.length > 0)) {
        return;
    }

    if (mockingMode) {

        const action = {
            type : "getPlatformsSuccess",
            payload : mockPlatforms.data,
        }
        dispatch(action) ;

    } else {

        const url = backendURL + "/platforms";

        await fetch(url, options)
            .then(res => res.json())
            .then((result) => {
                if (isServerSuccessResponse(result)) {

                    let plaforms : IPlatform[] = [];
                    result.data.forEach( (platform) => {
                        plaforms.push({name: platform.name, selected: true})
                    })

                    const action = {
                        type : "getPlatformsSuccess",
                        payload : plaforms,
                    };
                    dispatch(action) ;
                

                } else if (isServerErrorResponse(result)) {
                    const action = {
                        type : "getPlatformsFailure",
                        payload : result.message
                    }; 
                    dispatch(action) ;
                

                } else {
                    const action = {
                        type : "getPlatformsFailure",
                        payload : "Error while trying to contact server for prices stats"
                    };
                    dispatch(action) ;
                  
                }
            },
            (error) => {
             
                const action = {
                    type : "getPlatformsFailure",
                    payload : error
                };

                dispatch(action) ;
            }
    )

    }
}