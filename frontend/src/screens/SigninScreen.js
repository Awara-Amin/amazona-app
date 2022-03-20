import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function SigninScreen(props) {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

// after we press on sign in we have to redirect the user to shippingScreen   or '/' this is homeScreen
   const redirect = props.location.search? props.location.search.split("=")[1] : '/';
//                  http://localhost:3000/shipping

//    console.log("kaka redirect is " + redirect) >>  /shipping

  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo, loading, error} = userSignin;
//   console.log(userInfo);

   const dispatch = useDispatch();
   
   const submitHandler = (e) => {
        e.preventDefault();
        // todo: sign in action 
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if(userInfo) {
            // props.history.push > awa eshe redirect, esta TO WHERE? Answer: see redirect
            props.history.push(redirect);
        }
    },[props.history, redirect, userInfo]); 
    

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>

                    {loading && <LoadingBox></LoadingBox>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
              
                <div>
                    <label htmlFor="email"> Email address</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter email" 
                      required
                      onChange={ e =>setEmail(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id="password" placeholder="Enter password" required
                    onChange={ e =>setPassword(e.target.value)}
                    ></input>
                </div>

                <div>
                    <label></label>
                    <button type="submit" className="primary">Sign In</button>
                </div>

                <div>
                    <label></label>
                    <div>
                    
                        {/* New customer? <Link to="/register">Create your account</Link> */}
                        New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>

                    </div>
                </div>



            </form>
        </div>
    )
}

// at the end go to App.js to define a route for SigninScreen
