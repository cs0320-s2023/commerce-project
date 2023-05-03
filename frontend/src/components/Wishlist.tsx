import {useEffect, useState} from "react"
import { useContext } from "react"

import React, { Component } from "react";
import "../App.css"
import { retrievePlatforms } from "../data/getPlatforms";
import {Alert} from "react-bootstrap"
import {Switch} from "antd";
import { userSignedIn } from "../firebase";
import { IProduct } from "../data/dataTypes";
import { PageContext } from "../App"

export const Wishlist  = () => {

    const {pageState, dispatch} = useContext(PageContext);

    const action = {
        type : "wishlistSuccess",
        payload : null,
    }

    interface Product {
        name: string;
        image: string;
    }

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [wishlist, setWishlist] = useState<IProduct[]>([]);

    
    const handleOpenPanel = () => {
      setIsPanelOpen(true);
      document.body.classList.add("wishlist-panel-open");
    };
    
    const handleClosePanel = () => {
      setIsPanelOpen(false);
      document.body.classList.remove("wishlist-panel-open");
    };

    function handleRemoveFromWishlist(product: IProduct) {
        const index = wishlist.findIndex((item) => item.name === product.name);
        if (index !== -1) {
          const newWishlist = [...wishlist];
          newWishlist.splice(index, 1);
          setWishlist(newWishlist);
        }
      }

    return(
        <div className="search-results" role="search-results">

        <button className="viewwishlist-btn"onClick={handleOpenPanel}>View Wishlist</button>
        {isPanelOpen && (
          <div className="wishlist-panel open">
            <button onClick={handleClosePanel}>Close</button>
            <h2>My Wishlist</h2>
            {wishlist.map((product) => (
              <div className="product" key={product.name}>
                <div className="product-image-wrapper">
                  <img src={product.image} className="product-image" />
                </div>
                <div className="product-name">{product.name}</div>
                <button onClick={() => handleRemoveFromWishlist(product)}>
                REMOVE
              </button>
              </div>
            ))}
          </div>

        )}
        </div>

    )


}
