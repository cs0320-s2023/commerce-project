import { IProduct } from "../data/dataTypes";
import { userSignedIn } from "../firebase";

export async function handleAddToWishlist3 (product : IProduct, dispatch : any) {
    console.log("Is user signed in?" + userSignedIn);
    if (!userSignedIn) {
        alert("You must sign in first!");
        return;
      }
    console.log("What is product" + product);

      const action = {
        type : "wishListAddSuccess",
        payload : product
    };
    dispatch(action) ;

  }


export async function handleRemoveFromWishlist3 (product : IProduct, dispatch : any) {
    if (!userSignedIn) {
        alert("You must sign in first!");
        return;
      }

      const action = {
        type : "wishListRemoveSuccess",
        payload : null,
    };
    dispatch(action) ;

  } 

  