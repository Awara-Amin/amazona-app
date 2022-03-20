import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import data from "../data";
import {Link} from 'react-router-dom'
import {createReview, detailsProduct} from '../actions/productActions'
import Rating from "../components/Rating"
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { addToFavorite } from '../actions/favoriteCartActions';

export default function ProductScreen(props) {
    
    console.log("in ProductScreen.js")
    console.log(props)
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');
    // const [color, setColor] = useState([]);
    
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error, product} = productDetails;
    console.log("this kaka now")
    console.log(product)


    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        loading: loadingReviewCreate, 
        error: errorReviewCreate, 
        success: successReviewCreate} = productReviewCreate;
    
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    

    useEffect(() => {
        if (successReviewCreate){
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET})
        }
        dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);


    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
        // props.history.push(`/cart/${productId}?qty=${qty}`);
        // props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
    };

    const handlingSizeChange = (e) => {
       setSize(e.target.value);
       console.log(size);
    }
    console.log(size);

    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating) {
            dispatch(createReview(productId, {rating, comment, name: userInfo.name})
            ); 
        } else {
                alert('Please enter comment and rating sir')
            }

    }
    // ******** favorite
    // const onAddToCart = async (id, productId) => {
    //     console.log("era");
    //     console.log(userInfo._id);
        
    //     addToFavorite(userInfo._id, productId);
    //     alert ('Item added to Cart');
    // }

    return (
        <div>
                {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                    <div>
                    <Link to="/">Back to result</Link>
                <div className="row top">
                    <div className="col-2">
                        <img 
                        className= "large"
                        src={product.image} 
                        alt={product.name}
                        ></img>
                    </div>

                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating 
                                rating={product.rating} 
                                numReviews={product.numReviews}
                                ></Rating>
                            </li>
                            <li>
                                Price : ${product.price}
                            </li>
                            <li>
                                Description
                                <p>{product.description}</p>
                            </li>
                            {/* ********* */}
                            {/* <button type="button"
                            
                            onClick={onAddToCart.bind(userInfo._id, product._id)}
                                    >Add To Cart</button> */}
                            <li>  
                            <div>
                                <span>Size</span>
                                <span className="sizeInCartScreen">
                                    <select 
                                         value={size} 
                                         onChange={handlingSizeChange}>
                                        <option value="">Select</option>
                                        {product.size?.map((anySize, index) => (
                                            <option key={index} value={anySize}>{anySize}</option>
                                            
                                        ))}
                                    </select>
                                </span>
                        </div>
                                {/* <div>
                                Size 
                                <select 
                                    value={size} 
                                    onChange={handlingSizeChange}>
                                        <p>{product.size}</p>
                                </select>
                                

                                </div> */}
                                
                            </li>


                        </ul>
                    </div>

                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    Seller <h2>
                                        <Link to={`/seller/${product.seller._id}`}>
                                            {product.seller.seller.name}
                                        </Link>
                                    </h2>
                                    <Rating 
                                        rating={product.seller.seller.rating}
                                        numReviews={product.seller.seller.numReviews}
                                    ></Rating>


                                </li>

                                <li>
                                    <div className="row">
                                        <div> Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>

                                <li>
                                    <div className="row">
                                        <div> Status</div>
                                        <div>
                                            {product.countInStock > 0 ? (
                                            <span className="success">In Stock</span>
                                            ) : (
                                            <span className="danger">Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 && (
                                        <>
                                        <li>
                                            <div className = "row">
                                                <div>Qty</div>
                                                <div>
                                                    <select 
                                                       value={qty} 
                                                       onChange={(e) => setQty(e.target.value)}>
                                                        {[...Array(product.countInStock).keys()].map((x) => (
                                                                <option key= {x +1} value={x + 1}>{x + 1}</option>
                                                            )
                                                            )}
                                                    </select>
                                                </div>

                                                
                                            </div>
                                        </li>
                                            <li>
                                            <button onClick={addToCartHandler} className="primary block">Add To Cart</button>
                                        </li>
                                        </>
                                    )
                                }
                                
                            </ul>
                        </div>
                    </div>
                </div>

                {/* review part */}
                <div>
                   <h2 id="reviews">Reviews</h2>
                   <h2 id="reviews">Reviews</h2>
                    {product.reviews.length === 0 && (
                    <MessageBox>There is no review</MessageBox>
                    )}

                   <ul>
                       {product.reviews.map((review) => (
                           <li key={review._id}>
                               <strong>{review.rating}</strong>
                               <Rating rating={review.rating} caption=" "></Rating>
                               <p>{review.createdAt.substring(0, 10)}</p>
                               <p>{review.comment}</p>
                           </li>
                       ))}

                       <li>
                           {userInfo ? (
                               <form className="form" onSubmit={submitHandler}>
                                   <div>
                                    <h2>Write a customer review</h2>
                                   </div>

                                   <div>
                                       <label htmlFor="rating">Rating</label>
                                       <select id="rating" value={rating} 
                                           onChange={(e) => setRating(e.target.value)}>
                                              <option value ="">Select...</option>
                                              <option value ="1">Poor</option>
                                              <option value ="2">Fair</option>
                                              <option value ="3">Good</option>
                                              <option value ="4">Very good</option>
                                              <option value ="5">Excelent</option>
                                       </select>
                                   </div>

                                   <div>
                                       <label htmlFor="comment">Comment</label>
                                       <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}>

                                       </textarea>
                                   </div>

                                   <div>
                                       <label></label>
                                       <button className="primary" type="submit">Submit</button>
                                   </div>

                                   <div>
                                   {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                   {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}
                                   </div>

                                </form>
                           )
                           : 
                           (
                              <MessageBox>
                                  Please <Link to="/signin">Sign In</Link> to write a review
                              </MessageBox> 
                           )
                           }

                               
                       </li>

                   </ul>

                </div>

            </div>
                )}
        </div> 
    )
}
