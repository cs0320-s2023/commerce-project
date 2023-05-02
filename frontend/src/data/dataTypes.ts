
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