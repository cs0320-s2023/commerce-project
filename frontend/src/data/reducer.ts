import {IPageState, IPageStateAction, mapProductPrice } from "./dataTypes";

export function reducer(state : IPageState, action : IPageStateAction) {
    const {type, sku, payload} =  action;
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

            mapProductPrice.set(sku, payload);

            return {
                ...state, 
                errorMessage : "",
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