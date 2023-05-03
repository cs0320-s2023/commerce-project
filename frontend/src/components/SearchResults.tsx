import { useContext } from "react"
import { PageContext } from "../App"
import {Card} from 'react-bootstrap'

import "../App.css"

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

    return (
      <div className="search-results" role="search-results">
        {productList.map((product: any) => (
          <div className="product" key={product.name}>
            <Card style={{ color: "#000" }} className="product-image-wrapper">
              <Card.Img src={product.image} className="product-image" />
              <button className="wishlist-btn">❤️</button>

              <Card.Title className="product-name">{product.name}</Card.Title> 
            </Card>
          </div>
        ))}
      </div>
    );
}

