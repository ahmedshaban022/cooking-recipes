
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from 'react-redux'
import Recipes from './Pages/Recipes';
import{ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AddRecipe from './Pages/AddRecipe';
import { useEffect, useState } from 'react';
import store from './store/store';
import RecipeDetails from './Pages/RecipeDetails';
import { ContextProvider } from './GlobalState';
function App() {
  

  return (
    // <Provider store={store}>

    <div className="App">
      <ContextProvider>


      <BrowserRouter >
   <Navbar/>
   <Routes>
    <Route path='/' exact element={<Recipes/>}/>
    <Route path='/add-recipe' exact element={<AddRecipe/>}/>
    <Route path='/recipe-details/:id' exact element={<RecipeDetails/>}/>
    <Route path='/login' exact element={<Login/>}/>
    <Route path='/register' exact element={<Register/>}/>
   </Routes>
 
    </BrowserRouter>
   
<ToastContainer autoClose={3000} />
      </ContextProvider>
    </div>
    // </Provider>
  );
}

export default App;
