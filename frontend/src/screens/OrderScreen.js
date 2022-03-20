// import  Axios  from 'axios';
import React, {useEffect} from 'react';
// import { PayPalButton } from "react-paypal-button-v2";
// import PaypalButton from 'react-paypal-button-v2'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";
// import { deliverOrder, detailsOrder, payOrder, pendingOrder } from '../actions/orderActions';
import { deliverOrder, detailsOrder, pendingOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import { ORDER_DELIVER_RESET, ORDER_PAY_RESET, ORDER_PENDING_RESET } from '../constants/orderConstants';
import { ORDER_DELIVER_RESET, ORDER_PENDING_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    // const [sdkReady, setSdkReady] = useState(false);
    
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order, loading, error} = orderDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;


    
    // const orderPay = useSelector((state) => state.orderPay);
    // const {
    //     loading: loadingPay, 
    //     error: errorPay, 
    //     success: successPay} = orderPay;

    const orderPending = useSelector((state) => state.orderPending);
        const {
            loading: loadingPending, 
            error: errorPending, 
            success: successPending} = orderPending;


    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver, 
        error: errorDeliver, 
        success: successDeliver} = orderDeliver;
    


    const dispatch = useDispatch();

    useEffect(() => {
        // const addPayPalScript = async () => {
        //     const {data} = await Axios.get('/api/config/paypal');
        //     const script = document.createElement('script');
        //     script.type="text/javascript";
        //     script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
        //     script.async = true;
        //     script.onload = () => {
        //         setSdkReady(true);
        //     };
        //     document.body.appendChild(script);
        // };
        if(!order || successPending || successDeliver|| (order && order._id !== orderId)) {
            dispatch({type: ORDER_PENDING_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId));
        } 
        // else { 
        //     if(!order.isPaid){
        //         if(!window.paypal) {
        //             addPayPalScript();
        //         } else {
        //             setSdkReady(true);
        //         }
        //     }
        // }
        
    }, [dispatch, orderId, order, successPending, successDeliver]);

    // const successPaymentHandler = (paymentResult) => {
        // dispatch(payOrder(order, paymentResult));
        // dispatch(pendingOrder(order, paymentResult));
        
    // };

    const successPaymentHandler = () => {
        // dispatch(payOrder(order, paymentResult));
        dispatch(pendingOrder(order));
        
    };


    const deliveHandler = () => {
        dispatch(deliverOrder(order._id))
    }
    return loading ? (
          <LoadingBox></LoadingBox>
          ) : error ? (<MessageBox variant="danger">{error}</MessageBox>)
          : (
      <div>
         <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>{order.shippingAddress.fullName} <br/>
                                    <strong>Address: </strong>{order.shippingAddress.address},
                                    {order.shippingAddress.city}, {' '}
                                    {order.shippingAddress.postalCode}
                                    ,{order.shippingAddress.country}
                                </p>
                                {order.isDelivered? (
                                <MessageBox variant="success">
                                    Delivered at {order.deliveredAt.substring(0,10)}
                                    </MessageBox>
                                ) : (
                                   <MessageBox variant="danger">Not Delivered Yet Sir</MessageBox>)

                                }
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong>{order.paymentMethod} 
                                </p>
                                {order.isPending? (
                                <MessageBox variant="success">
                                    Paid at {order.pendingAt.substring(0,10)}
                                    </MessageBox>
                                ) : 
                                (<MessageBox variant="danger">But Not Paid Yet</MessageBox>)

                                }
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {order.orderItems.map((item) =>(
                                        <li key={item.product}>
                                            <div className="row">

                                                <div>
                                                    <img 
                                                      src={item.image} 
                                                      alt={item.name} 
                                                      className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                
                                                <div>
                                                    {item.qty} x  ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                    }
                                 </ul> 

                                
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summery</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>                       
                            </li>

                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>                       
                            </li>

                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>                       
                            </li>

                            <li>
                                <div className="row">
                                    <div>
                                        <strong>Order Total</strong>
                                    </div>
                                    <div><strong>${order.totalPrice}</strong></div>
                                </div>                       
                            </li>
                            {/* {!order.isPaid && (
                                    <li>
                                        {!sdkReady ? (
                                        <LoadingBox></LoadingBox>
                                        ) : (
                                            <>
                                            {errorPay && ( 
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}

                                            <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                            </>
                                        )}
                                    </li>
                                )
                            } */}

                            <button 
                            type="button" 
                            className= "primary block"
                            onClick={successPaymentHandler}
                            >Make it pending
                            </button>

                            {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && ( */}
                            {userInfo.isAdmin && !order.isPaid && order.isDelivered && (
                                <li>
                                    {loadingDeliver && <LoadingBox></LoadingBox>}
                                    {errorDeliver && (<MessageBox variant="danger">{errorDeliver}</MessageBox>)}
                                    
                                    <button type="button" className= "primary block" onClick={deliveHandler}>
                                        Deliver Order

                                    </button>
                                </li>
                            )}

                        </ul>
                    </div>


                </div>
            </div>
        </div>
    )
}
