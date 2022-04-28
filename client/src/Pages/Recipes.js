import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {toast} from 'react-toastify';
import Loader from '../Components/loader/Loader';

import Recipe from '../Components/Recipe';
import { GlobalState } from '../GlobalState';

const Recipes = () => {
  
  const navigate=useNavigate();
  const state=useContext(GlobalState);
  const [Recipes,setRecipes]=state.recipesAPI;
  const setCallBack=state.recipesAPI[2];



  useEffect(() => {
    let token=localStorage.getItem('token')
    if(!token){return navigate('/login');}  
    if(Recipes.length===0){setCallBack(true)}
    
  }, []);



  return (
    <div className='container'>
<h4 className='text-muted '>{Recipes.length} Recipes</h4>
    
    {Recipes.length>0?<Recipe Recipes={Recipes} setRecipes={setRecipes}/>:
    <div className=' row '>
      <div className='col-12 d-flex justify-content-center'>
      <Loader/></div>
      </div>}
     
    </div>
  )
}

export default Recipes