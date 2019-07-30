import {combineReducers} from 'redux';

//local storage on the local window browser
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//reducers to combine
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';


//define persist config. It is an  object that represents the possible confirgurations we want for redux persist to use
//@key At what point inside the reducer object should we start storing in. Root in this case
//@whitelist contains the string names of the reducers we want to store. In this case only the cart is whitelisted because user is already persisted by firebase
const persistConfig= {
    key: 'root',
    storage, 
    whitelist: ['cart']
}

const rootReducer= combineReducers({
    user: userReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);