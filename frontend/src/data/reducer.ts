import {IPageState, IPageStateAction } from "./dataTypes";

export function reducer(state : IPageState, action : IPageStateAction) {
    const {type, payload} =  action;
    const username = localStorage.getItem('name');

    console.log("reducer called with type = " + type)

    switch (type) {
        case "searchSuccess" :

            console.log("searchSuccess data.length = " + payload.length)

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

        default :
            throw new Error("unhandled reducer action")
        }
}