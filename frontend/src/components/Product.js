import React from 'react';
import {Link} from "react-router-dom"
import Rating from "./Rating"

export default function Product(props) {
    
    const {product} = props;
    //const user = props.user;
    console.log("first props in Product.js")
    console.log(product._id)

    
    

    // const myFavorateHandler = () => {
    //     // console.log("hi sir");
    //     alert("I like this one");
    //     // props.history.push(`/cart/${product._id}`)
    // }
    return (
        <div key={product._id} className="card">
            
                <Link to={`/product/${product._id}`}>
                <img className="medium" src={product.image} alt={product.name} />
                </Link>
                <div className="card-body">

                {/* <div className="row">
                        <div style={{color:"red"}}>test kaka</div>
                        <div><i class="fa fa-heart-o"></i></div>
                        <div><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
                        

                        <div>
                            <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                            
                            </Link>
                        </div>
                    </div> */}
                    
                    <Link to={`/product/${product._id}`}>
                            <h2>{product.name}</h2>
                    </Link>
                    
                    <Rating rating={product.rating} numReviews={product.numReviews}
                    ></Rating>
                    
                    <div className="row">
                        <div className="price">${product.price}</div>
                        <Link to={`/favorite/${product._id}`}>
                        <div><i className="fa fa-heart-o"></i></div>
                        
                        </Link>
                        
                        <div>
                            <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                            {/* {console.log("test")} */}
                            {/* {console.log(product.seller.seller.name)} */}
                            </Link>
                        </div>
                    </div>

                    
                    
                </div>
            </div>
    )
}
