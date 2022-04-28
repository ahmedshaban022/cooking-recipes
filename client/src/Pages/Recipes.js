import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify';

import Recipe from '../Components/Recipe';
import { GlobalState } from '../GlobalState';

const Recipes = () => {
  
  const navigate=useNavigate();
  const state=useContext(GlobalState);
  const [Recipes,setRecipes]=state.recipesAPI;
  


  useEffect(() => {
    let token=localStorage.getItem('token')
    if(!token){return navigate('/login');}  

    
  }, []);



  return (
    <div className='container'>
<h4 className='text-muted '>{Recipes.length} Recipes</h4>
    
    <Recipe Recipes={Recipes} setRecipes={setRecipes}/>
     
    </div>
  )
}

export default Recipes