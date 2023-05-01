import {mockSearch} from "../../../mockdata/search";
import { mockingMode } from "./mockingMode";

export interface IProduct {
    id: string,
    name: string,
    sku: string,
    image: string | null,
}

// const mockProductList : IProduct[] = [
//     {
//         key: "Gazelle-bold-shoes",
//         value: "Nike gazelle bold shoes",
//     },
//     {
//         key: "Samba-og-shoes",
//         value: "Adidas Samba OG Shoes",
//     },
//     {
//         key: "nizza-platform-shoes",
//         value: "Puma Nizza Platform Shoes",
//     },
//     {
//         key: "vegan-cycling-shoes",
//         value: "Adidas Vegan Cycling Shoes",
//     },
//     {
//         key: "ultra-4d-running-shoes",
//         value: "Adidas Ultra Running Shoes",
//     },
//   ];
import { secretAPIkey } from "./apikey";

export async function getProductList (searchText : string, setProductList : any)  {
    if (mockingMode) {
        return mockSearch.data; 
    } else {
        const searchURL = `https://sneakers-real-time-pricing.p.rapidapi.com/sneakers?extended=tru&name=${searchText}`;
        
        const options = {  
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': secretAPIkey,
            },          
          }

        await fetch(searchURL, options)
            .then(res => res.json())
            .then(
            (result) => {
                setProductList(result.data)
            },
            (error) => {
                setProductList([])
            }
        )
        

    }
}