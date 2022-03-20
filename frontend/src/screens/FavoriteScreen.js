import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToFavorite, removeFromFavorite } from '../actions/cartActions';

export default function FavoriteScreen(props) {
  const productId = props.match.params.id;
        

  
  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;
  console.log(favoriteItems);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToFavorite(productId));
    }
  }, [dispatch, productId]);

  const removeFromFavoriteHandler = (id) => {
    // delete action
    alert("delete me")
    dispatch(removeFromFavorite(id));
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Favorite List</h1>

        <ul>
          {favoriteItems.map((item) => (
            <li key={item.product}>
              <div className="row">
                <div>
                  <img src={item.image}
                  alt={item.name} className="small"></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
  
                  <div>

                  {/* <select>
                      <div className="row">
                          <div> Status</div>
                          <div>
                              {item.qty > 0 ? (
                              <span className="success">In Stock</span>
                              ) : (
                              <span className="danger">Unavailable</span>
                              )}
                          </div>
                      </div>
                  </select> */}



                    <select value={item.qty}>
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div>Size</div>
                  <div>{item.size}</div>
  
                  <div>
                    {item.qty}x${item.price}
                  </div>
                  <div>
                  <button 
                  type="button" 
                  onClick={() =>removeFromFavoriteHandler(item.product)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>Go Back Shopping</h2>
            </li>
            <li>
              <Link to="/">
                <button type="button" className="primary block">
                  Back
                </button>
              </Link>
            </li>
          </ul>
          </div>
      </div>
    </div>
  );
}