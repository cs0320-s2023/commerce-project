
export interface IProduct {
    id: string,
    name: string,
    sku: string,
    image: string | null,
}

export interface IPageState {
    errorMessage: string,
    productList: IProduct[],
    userName : string
}

export const defaultPageState : IPageState = { 
    errorMessage: "",
    productList: [],
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