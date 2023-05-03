import {IPageState, IPageStateAction } from "./dataTypes";

export function reducer(state : IPageState, action : IPageStateAction) {
    const {type, payload} =  action;
    const username = localStorage.getItem('name');

    switch (type) {
        case "searchSuccess" :

            return {
                ...state, 
                productList : payload,
                errorMessage : "",
                userName: username
            }

        case "searchFailure" :

            return {
                ...state, 
                productList : [],
                errorMessage : payload,
                userName: username
            }

        case "priceStatsSuccess" :

            return {
                ...state, 
                selectedProductPriceStats : payload,
                errorMessage : "",
                userName: username
            }
        
        case "priceStatsFailure" :

            return {
                ...state, 
                selectedProductPriceStats : [],
                errorMessage : payload,
                userName: username
            }


        default :
            throw new Error("unhandled reducer action")
        }
}