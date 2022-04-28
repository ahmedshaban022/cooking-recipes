import {combineReducers} from 'redux';
import authReducer from './reducers/auth';
import recipesReducer from './reducers/recipesReducer';


export default combineReducers({
    recipes:recipesReducer,
    // isLogged:authReducer
})