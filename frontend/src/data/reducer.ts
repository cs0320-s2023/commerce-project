import {IPageState, defaultPageState} from "./dataTypes";

interface IPageStateAction {
    type : string ;
    payload : any ;
}

export function reducer(state : IPageState, action : IPageStateAction) {
    const {type, payload} =  action;

    console.log("reducer called");
    
    switch (type) {
        case "searchSuccess" :
            
        console.log("searchSuccess")
            return {
                ...state, 
                productList : payload,
                errorMessage : ""
            }

        case "searchFailure" :

            return {
                ...state, 
                productList : [],
                errorMessage : payload,
            }

        default :
            throw new Error("unhandled reducer action")
        }
}