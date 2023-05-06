
export interface IProduct {
    id: string,
    name: string,
    sku: string,
    image: string | undefined,
}

export interface IPriceStat {
    platformName: string,
    minPriceUsd: number,
    avgPriceUsd: number,
    lastPriceUsd: number,
}

export interface IWishList {
    products: IProduct[]
}

export interface IPageState {
    errorMessage: string,
    productList: IProduct[],
    selectedProductPriceStats: IPriceStat[],
    userName : string | null,
    IWishList : IProduct[],
    platforms: IPlatform[]
}

export interface IPlatform {
    name: string,
    selected: boolean
}

export const defaultPageState : IPageState = { 
    errorMessage: "",
    productList: [],
    selectedProductPriceStats: [],
    userName : "",
    IWishList : [],
    platforms: []
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
    sku: string;
}

export const mapProductPrice = new Map<string, IPriceStat[]>();