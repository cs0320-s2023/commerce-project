interface IProduct {
    key: string,
    value: string,
}

const mockProductList : IProduct[] = [
    {
        key: "Gazelle-bold-shoes",
        value: "Nike gazelle bold shoes",
    },
    {
        key: "Samba-og-shoes",
        value: "Adidas Samba OG Shoes",
    },
    {
        key: "nizza-platform-shoes",
        value: "Puma Nizza Platform Shoes",
    },
    {
        key: "vegan-cycling-shoes",
        value: "Adidas Vegan Cycling Shoes",
    },
    {
        key: "ultra-4d-running-shoes",
        value: "Adidas Ultra Running Shoes",
    },
  ];

export const getProductList = () : IProduct[] => {
    console.log("getProductList " + mockProductList);
    return mockProductList
}