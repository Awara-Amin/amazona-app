// **********
import { 
        // FAV_DETAILS_REQUEST, 
        //  FAV_DETAILS_FAIL, 
        //  FAV_DETAILS_SUCCESS, 
         GET_TO_FAV,
         FAVORITECART_LOADING_TO_FAV,
         ADD_TO_FAV,
         DELETE_FROM_FAV} from "../constants/favoriteCartConstants";

const initialState = {
            favorites: null,
            loading: false
        }
// export const favoriCartReducer = (state = {favorites: null, loading: false},
export const favoriCartReducer = (state = initialState, action
     ) => {
    switch (action.type){
        case GET_TO_FAV:
            return {
                ...state,
                favorites: action.payload,
                loading: false
            }
            case ADD_TO_FAV:
                return {
                    ...state,
                    favorites: action.payload
                }
    
            case DELETE_FROM_FAV:
                return {
                    ...state,
                    favorites: action.payload
                }
    
            case FAVORITECART_LOADING_TO_FAV:
                return {
                    ...state, 
                    loading: true
                }
    

    default:
            return state;
        }
};





// case FAV_DETAILS_REQUEST:
//             return {loading: true};
//         case FAV_DETAILS_SUCCESS:
//             return {loading: false, favorites: action.payload};
            
            
//             // {loading: false, favorites: action.payload.favorites,
//             // pages: action.payload.pages,
//             // page: action.payload.page,
//             // };
//         case FAV_DETAILS_FAIL:
//                 return {loading: false, error: action.payload};
//         default:
//                 return state;



