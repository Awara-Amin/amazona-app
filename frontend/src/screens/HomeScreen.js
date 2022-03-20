import React, {useEffect} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox"
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import {Link} from "react-router-dom";

import Topcarusel from '../components/Topcarusel';
// import data from "../data"


export default function HomeScreen() {
const dispatch = useDispatch();
const productList = useSelector((state) => state.productList);
const {loading, error, products} = productList;


const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;
  

  useEffect(() => {
    // dispatch(listProducts());
    dispatch(listProducts({}));
    dispatch(listTopSellers())
  }, [dispatch]);

    return (
      <div>
        <div className="test1">
        {/* <h2>Top Sellers</h2> */}
          
        <Topcarusel></Topcarusel>
      
        </div>
        <div>
          
          {/* <h2>Top Sellers</h2>
          
              <>
              
              <Carousel showArrows autoPlay showThumbs={false}>
                
                  <section>
                      <img src={p1} alt={"test"}></img>
                      <p>Hi mate</p>
                  </section>
                
              </Carousel>
              </> */}
          
          
         
          
              <h2>Featured Products</h2>

              {loading? (<LoadingBox></LoadingBox>
              ) : error? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (

                <>
                {products.length === 0 && (<MessageBox>No Product found kaka</MessageBox>)}

                <div className="row center">
                  {products.map((product)=>(
                  <Product key={product._id} product={product}></Product>
                ))
              }
              </div>
                </>
              )
              }


            <h2>Top Sellers</h2>
                {loadingSellers? (<LoadingBox></LoadingBox>
                ) : errorSellers? (
                  <MessageBox variant="danger">{errorSellers}</MessageBox>
                ) : (
                  <>
                  {sellers.length === 0 && (<MessageBox>No Seller found kaka</MessageBox>)}
                  <Carousel showArrows autoPlay showThumbs={false}>
                    {sellers.map((seller) =>(
                      <div key={seller._id}>
                        <Link to={`/seller/${seller._id}`}>
                          <img src={seller.seller.logo} alt={seller.seller.name}></img>
                          <p className="legend">{seller.seller.name}</p>
                        </Link>
                      </div>
                    ))}
                  </Carousel>
                  </>
                
                )}
        
      </div>
      </div>
    )
}
