
export interface IProduct {
    id: string,
    name: string,
    sku: string,
    image: string | null,
}

export interface IPriceStat {
    platformName: string,
    minPriceUsd: number,
    avgPriceUsd: number,
    lastPriceUsd: number,
}

export interface IPageState {
    errorMessage: string,
    productList: IProduct[],
    selectedProductPriceStats: IPriceStat[],
    userName : string
}

export const defaultPageState : IPageState = { 
    errorMessage: "",
    productList: [],
    selectedProductPriceStats: [],
    userName : ""
};

export interface IInitialPageContext {
    pageState: IPageState,
    dispatch: any
  }
  
export const initialContext : IInitialPageContext = {
    pageState: defaultPageState,
    dispatch: undefined
  }
  
export interface IPageStateAction {
    type : string ;
    payload : any ;
}