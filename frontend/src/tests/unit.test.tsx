import { getPrices, getProduct } from "../data/getPrices";
import {handleAddToWishlist3, handleRemoveFromWishlist3} from "../data/getWishlist"
import { IProduct } from "../data/dataTypes";
import { userSignedIn } from "../firebase";

describe("getPrices", () => {
  it("should return prices for a valid product key", () => {
    const prices = getPrices("Gazelle-bold-shoes");
    expect(prices).toEqual([
      { vendor: "Vendor 1", price: 45 },
      { vendor: "Vendor 2", price: 45.67 },
      { vendor: "Vendor 3", price: 46 },
    ]);
  });

  it("should return an empty array for an invalid product key", () => {
    const prices = getPrices("invalid-key");
    expect(prices).toEqual([]);
  });
});

describe("getProduct", () => {
  it("should return a product for a valid product key", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(product).toEqual({
      key: "Gazelle-bold-shoes",
      value: "Nike gazelle bold shoes",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c69922d42fc84de28e9baf5400edaf14_9366/Gazelle_Bold_Shoes_Black_HQ4408_02_standard.jpg",
      prices: [
        { vendor: "Vendor 1", price: 45 },
        { vendor: "Vendor 2", price: 45.67 },
        { vendor: "Vendor 3", price: 46 },
      ],
    });
  });

  it("should return undefined for an invalid product key", () => {
    const product = getProduct("invalid-product-key");
    expect(product).toBeUndefined();
  });

  it("should return the first product for a duplicate product key", () => {
    const product = getProduct("Gazelle-bold-shoes");
    const duplicateProduct = getProduct("Gazelle-bold-shoes");
    expect(duplicateProduct).toEqual(product);
  });

  it("should return a product with a non-empty prices array", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(product.prices.length).toBeGreaterThan(0);
  });

  it("should return a product with prices that are numbers", () => {
    const product = getProduct("Gazelle-bold-shoes");
    for (let price of product.prices) {
      expect(typeof price.price).toBe("number");
    }
  });

  it("should return a product with prices that are greater than or equal to zero", () => {
    const product = getProduct("Gazelle-bold-shoes");
    for (let price of product.prices) {
      expect(price.price).toBeGreaterThanOrEqual(0);
    }
  });

  it("should return a product with prices that are not NaN", () => {
    const product = getProduct("Gazelle-bold-shoes");
    for (let price of product.prices) {
      expect(isNaN(price.price)).toBe(false);
    }
  });

  it("should return a product with a key that is a non-empty string", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(typeof product.key).toBe("string");
    expect(product.key.length).toBeGreaterThan(0);
  });

  it("should return a product with a value that is a non-empty string", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(typeof product.value).toBe("string");
    expect(product.value.length).toBeGreaterThan(0);
  });

  it("should return a product with an image that is a non-empty string", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(typeof product.image).toBe("string");
    expect(product.image.length).toBeGreaterThan(0);
  });

});


describe("getProduct", () => {
  it("should return a product for a valid product key", () => {
    const product = getProduct("Gazelle-bold-shoes");
    expect(product).toEqual({
      key: "Gazelle-bold-shoes",
      value: "Nike gazelle bold shoes",
      image:
        "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c69922d42fc84de28e9baf5400edaf14_9366/Gazelle_Bold_Shoes_Black_HQ4408_02_standard.jpg",
      prices: [
        { vendor: "Vendor 1", price: 45 },
        { vendor: "Vendor 2", price: 45.67 },
        { vendor: "Vendor 3", price: 46 },
      ],
    });
  });
});

