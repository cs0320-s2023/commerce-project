import { useContext, useState, useEffect } from "react"
import { PageContext } from "../App"
import { getPriceStats } from "../data/getPriceStats"
import {Card} from 'react-bootstrap'
import { ProductPriceStats } from "./ProductPriceStats"

import "../App.css"
import { auth, db, userSignedIn } from "../firebase";
import { collection, addDoc, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore"


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

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
          const unsubscribe = onSnapshot(
            collection(db, "users", user.uid, "wishlist"),
            (snapshot) => {
              const wishlistData: Product[] = [];
              snapshot.forEach((doc) => {
                wishlistData.push(doc.data() as Product);
              });
              setWishlist(wishlistData);
            }
          );
          return () => unsubscribe();
        }
      }, [userSignedIn]);




    // HANDLE WISHLIST
      
    function handleAddToWishlist(product: Product) {
        if (!userSignedIn) {
          alert("You must sign in first!");
          return;
        }
        
        // const user = auth.currentUser;
        // if (user) {
        //     const uid = user.uid;
        //     const wishlistRef = collection(db, "users", uid, "wishlist");
        //     addDoc(wishlistRef, {
        //     name: product.name,
        //     image: product.image
        //     });
        // }


        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const wishlistRef = collection(db, "users", uid, "wishlist");
            const docRef = doc(wishlistRef, product.name); // Use product name as document ID
            setDoc(docRef, {
            name: product.name,
            image: product.image
            });
        }
        
        
        
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 2000); // hide the message after 2 seconds

        //alert("Yay! Added shoe to your favs");

        // setWishlist([...wishlist, product]);
    }

    function handleRemoveFromWishlist(product: Product) {
        const index = wishlist.findIndex((item) => item.name === product.name);
        if (index !== -1) {
        
        const user = auth.currentUser;
        if (user) {
        const uid = user.uid;
        const wishlistRef = collection(db, "users", uid, "wishlist");
        const docRef = doc(wishlistRef, product.name); // Use product name as document ID
        deleteDoc(docRef); // Remove document with corresponding product name
        }



        //   const newWishlist = [...wishlist];
        //   newWishlist.splice(index, 1);
        //   setWishlist(newWishlist);
        }
    }

    const handleOpenPanel = () => {
    setIsPanelOpen(true);
    document.body.classList.add("wishlist-panel-open");
    if (!userSignedIn) {
        setIsPanelOpen(false);
        alert("You must sign in first to add items to your wishlist!");
    }

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
         <button className="viewwishlist-btn" onClick={handleOpenPanel}>Your Favs ❤️</button>
        
        {productList.map((product : any) => (
                  <Card style={{ color: "#000" }} className="product-card" key = {product.sku}>
                    <div className="product-container">
                        <div className = "product-image">
                            <img src={product.image} className="product-image" onClick={() => {getSelectedPriceStats(product.sku)}} />                    
                            <button className="wishlist-btn" onClick={() => handleAddToWishlist(product)}>❤️</button>                                    
                        </div>
                        <div className = "product-details">
                            <span className="product-name">{product.name}</span>
                            <ProductPriceStats sku={product.sku} />
                        </div>
                    </div>
                  </Card>
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

              </div>
            ))}


          </div>
        )}
        </div>
    )
    
}
export default SearchResults;


