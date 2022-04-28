import { configureStore, createStore } from "redux";
import combineReducers from "./combineReducers";



// const store = legacy_createStore(combineReducers)
const store=createStore(combineReducers);


export default store;