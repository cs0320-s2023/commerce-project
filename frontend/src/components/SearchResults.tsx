import { useContext, useState } from "react"
import { PageContext } from "../App"
import { getPriceStats } from "../data/getPriceStats"
import {Card} from 'react-bootstrap'

import "../App.css"
import { userSignedIn } from "../firebase";


export const SearchResults = () => {

    const {pageState, dispatch} = useContext(PageContext);

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
    const [showMessage, setShowMessage] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // HANDLE WISHLIST
      
    function handleAddToWishlist(product: Product) {
        if (!userSignedIn) {
          alert("You must sign in first!");
          return;
        }

        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 2000); // hide the message after 2 seconds

        //alert("Yay! Added shoe to your favs");

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

    const handleOpenPanel = () => {
    setIsPanelOpen(true);
    document.body.classList.add("wishlist-panel-open");
    };
      
    const handleClosePanel = () => {
        setIsPanelOpen(false);
        document.body.classList.remove("wishlist-panel-open");
    };
 
    const showWishlistButton = () => {
        setIsWishlistOpen(true);
        document.body.classList.add("viewwishlist-btn");
    };
    
    const hideWishlistButton = () => {
        setIsWishlistOpen(false);
        document.body.classList.remove("viewwishlist-btn");
    };

    // HANDLE PRICES PANEL


    const getSelectedPriceStats = (sku: string) => {

        if ((sku == null) || (sku == undefined) || (sku.length == 0)) {
            return;
        } else {
            //handleOpenPanel()
            getPriceStats(sku, dispatch);
        }
    }
    // onClick={() => handleAddToWishlist(product)}

    return(

        <div className="search-results" role="search-results">
        {/* <button className="viewwishlist-btn"onClick={handleOpenPanel}>View Wishlist</button> */}
        {userSignedIn ? <button className="viewwishlist-btn" onClick={handleOpenPanel}>Your Favs ❤️</button> : null}
        
        <br></br>
        {productList.map((product : any) => (
                <div className = "product" key = {product.name} >
                  <Card style={{ color: "#000" }} className="product-image-wrapper">
                    <Card.Img src={product.image} className="product-image" onClick={() => {getSelectedPriceStats(product.sku)}} />
                    
                        <button className="wishlist-btn" onClick={() => handleAddToWishlist(product)}>❤️</button>
                                     
                    <Card.Title className="product-name">{product.name}</Card.Title> 
                  </Card>
                </div>
        ))}


        
        {isPanelOpen && (
          <div className="wishlist-panel open">
            <button className="wishlist-panel-close-btn" onClick={handleClosePanel}>Close</button>
            <h2>My Wishlist</h2>
            {wishlist.map((product) => (
              <div className="product" key={product.name}>

                <Card style={{ color: "#000" }} className="product-image-wrapper">
                    <Card.Img src={product.image} className="product-image" />                                     
                    <Card.Title className="product-name">{product.name}</Card.Title> 
                    <button className= "handleRemoveFromWishlistBtn" onClick={() => handleRemoveFromWishlist(product)}>
                         Remove
                     </button>
                </Card>

                {/* <div className="product-image-wrapper-wishlist">
                  <img src={product.image?product.image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Running_shoe_icon.png/640px-Running_shoe_icon.png"} className="product-image" />
                </div>
                <div className="product-name">{product.name}</div> */}
                
              </div>
            ))}


          </div>
        )}
        </div>
            // {productList.map((product : any) => (
            //     <div className = "product" key = {product.name} >
            //         {/* <img src={product.image} className="product-image"/>    

            //         <div className = "name+like"> 
            //             <button className = "wishlist-btn"> ❤️ </button>
            //             <div className = "product-name"> {produconClick={() => {getSelectedPriceStats(product.sku)}}t.name} </div>

            //         </div> */}

            //       <Card style={{ color: "#000" }} className="product-image-wrapper">
            //         <Card.Img src={product.image} className="product-image" onClick={() => {getSelectedPriceStats(product.sku)}} />
            //         <button className="wishlist-btn">❤️</button>
            //         <Card.Title className="product-name">{product.name}</Card.Title> 
            //       </Card>
            //     </div>
            //  ))}
        // </div> 
    )
    
}
export default SearchResults;


