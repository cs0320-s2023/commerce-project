import {mockingMode} from "./mockingMode";
import {backendURL} from "./backend.config";
import mockPlatforms from "../../../mockdata/platforms.json";
import { isServerSuccessResponse, isServerErrorResponse } from "./typePredicate";
import { IPlatform } from "./dataTypes";

export async function getPlatforms (platforms: IPlatform[], dispatch : any) {

    // If we already have the platforms list, we do not need to make a new request to the back end.
    if ((platforms != null) && (platforms != undefined) && (platforms.length > 0)) {
        return;
    }

    if (mockingMode) {

        let plaforms : IPlatform[] = [];
        mockPlatforms.data.forEach( (platform) => {
            plaforms.push({name: platform.name, selected: true})
        })

        const action = {
            type : "getPlatformsSuccess",
            payload : plaforms
        }
        dispatch(action) ;

    } else {

        const url = backendURL + "/platforms";

        await fetch(url)
            .then(res => res.json())
            .then((result_raw) => {
                if (isServerSuccessResponse(result_raw)) {
                    const result : any = result_raw.data;

                    let plaforms : IPlatform[] = [];
                    result.data.forEach( (platform: IPlatform) => {
                        plaforms.push({name: platform.name, selected: true})
                    })

                    const action = {
                        type : "getPlatformsSuccess",
                        payload : plaforms,
                    };
                    dispatch(action) ;
                

                } else if (isServerErrorResponse(result_raw)) {
                    const action = {
                        type : "getPlatformsFailure",
                        payload : result_raw.message
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