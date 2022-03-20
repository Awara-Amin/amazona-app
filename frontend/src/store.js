import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer, favoriteReducer } from './reducers/cartReducers';
// *********** favorite into dataBase
// import { favoriCartReducer } from './reducers/favoriteCartReducers';

// import { favoriteListReducer } from './reducers/favoriteCartReducers';
// import { orderCreateReducer } from './reducers/orderReducers';
import {orderCreateReducer, 
        orderDeleteReducer, 
        orderDeliverReducer, 
        orderDetailsReducer, 
        orderListReducer, 
        orderMineListReducer, 
        // orderPayReducer,
        
        orderPendingReducer,
        
        orderSummaryReducer} from './reducers/orderReducers'

import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer,
         productListReducer, 
         productUpdateReducer,
         productReviewCreateReducer, } from './reducers/productReducers';

import { userAddressMapReducer, userDeleteReducer, userDetailReducer, 
         userListReducer, 
         userRegisterReducer, 
         userSigninReducer, 
         userTopSellerListReducer, 
         userUpdateProfileReducer, 
         userUpdateReducer} from './reducers/userReducers';


const initialState = {
    // intial states 
    userSignin: {
        userInfo: localStorage.getItem ('userInfo')
        ? JSON.parse(localStorage.getItem ('userInfo'))
        : null,    
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems')):
        [],
        shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem ('shippingAddress'))
        : 
        {},
        paymentMethod: 'PayPal',
    }, 
    
    favorite: {
        favoriteItems: localStorage.getItem('favoriteItems')
        ? JSON.parse(localStorage.getItem('favoriteItems')):
        [],
    }
// *********** favorite into dataBase
    // favorite: { 
    //     favorateProducts:[]
    //  }
    
};

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister:userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    // orderPay: orderPayReducer,
    orderPending: orderPendingReducer,
    orderMineList:orderMineListReducer,
    userDetails: userDetailReducer,
    userUpdateProfile:userUpdateProfileReducer,

    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    productDelete: productDeleteReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,

    userList: userListReducer,
    userDelete:userDeleteReducer,
    userUpdate: userUpdateReducer,
    userTopSellersList: userTopSellerListReducer,
    productCategoryList: productCategoryListReducer,

    productReviewCreate: productReviewCreateReducer,

    userAddressMap: userAddressMapReducer,

    orderSummary: orderSummaryReducer,
    favorite: favoriteReducer,
    // *********** favorite into dataBase
    // favorite: favoriCartReducer,


    








})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))
)

export default store;