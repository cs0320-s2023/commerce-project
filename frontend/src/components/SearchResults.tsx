import { useContext, useState } from "react"
import { PageContext } from "../App"

import "../App.css"
import { userSignedIn } from "../firebase";


export const SearchResults = () => {

    const {pageState} = useContext(PageContext);

    // DEFENSIVE PROG: If no pageState  is defined yet, we return an empty div
    if ((pageState == null) || (pageState == undefined)){
        return <div/>
    } 
    const productList = pageState.productList;

    // DEFENSIVE PROG: If no product list is defined yet, we return an empty div
    if ((productList == null) || (productList == undefined)){
        return <div/>
    }
    
    interface Product {
        name: string;
        image: string;
      }
      
    const [wishlist, setWishlist] = useState<Product[]>([]);

      
    function handleAddToWishlist(product: Product) {
        if (!userSignedIn) {
          alert("You must sign in first!");
          return;
        }
        setWishlist([...wishlist, product]);
    }

    function handleRemoveFromWishlist(product: Product) {
        const index = wishlist.findIndex((item) => item.name === product.name);
        if (index !== -1) {
          const newWishlist = [...wishlist];
          newWishlist.splice(index, 1);
          setWishlist(newWishlist);
        }
      }

      const [isPanelOpen, setIsPanelOpen] = useState(false);
    
      const handleOpenPanel = () => {
        setIsPanelOpen(true);
        document.body.classList.add("wishlist-panel-open");
      };
      
      const handleClosePanel = () => {
        setIsPanelOpen(false);
        document.body.classList.remove("wishlist-panel-open");
      };


    return(
        <div className="search-results" role="search-results">
        {productList.map((product: any) => (
            <div className="product" key={product.name}>
            <div className="product-image-wrapper">
                <img src={product.image} className="product-image" />
                <button className="wishlist-btn" onClick={() => handleAddToWishlist(product)}>❤️</button>
            </div>
            <div className="product-name">{product.name}</div>
            </div>
        ))}


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
export default SearchResults;



