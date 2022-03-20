import Axios from "axios";
import { ADD_TO_FAV, FAV_DETAILS_FAIL } from "../constants/favoriteCartConstants";


// import { FAV_DETAILS_FAIL, FAV_DETAILS_REQUEST, FAV_DETAILS_SUCCESS } from "../constants/favoriteCartConstants";

// export const addToFavorite = (productId) => async (dispatch) =>{
//     dispatch({type: FAV_DETAILS_REQUEST, payload: productId});
//     try {
//         const {data} = await Axios.get(`/api/favoritecarts/${productId}`);
//         dispatch({type: FAV_DETAILS_SUCCESS, payload: data});

//     } catch(error) {
//         dispatch({type: FAV_DETAILS_FAIL, 
//             payload: 
//             error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//         });
//     }
// };


// **********
export const addToFavorite = (id, productId) => async (dispatch) => {
    const { data } = await Axios.post(`/api/favoritecarts/${id}`, {productId})
    try {
            dispatch({ type: ADD_TO_FAV, payload: data });
    }catch (error){
            dispatch({type: FAV_DETAILS_FAIL, payload: error.message});
        
        }
}


