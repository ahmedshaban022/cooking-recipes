import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalState } from '../GlobalState';


const RecipeDetails = () => {
  const navigate=useNavigate();
  const state=useContext(GlobalState);
  const [Recipes,setRecipes]=state.recipesAPI;

  const [recipe,setRecipe]=useState({});
  const param=useParams();
  
  const testFn=(item)=>{
    
    for(let i=0; i<Recipes.length;i++){
      
      Recipes[i]._id===param.id && setRecipe({...Recipes[i]});
      
      
    };
  }
  useEffect(() => {
    if(!localStorage.getItem('token'))navigate('/login'); 
    testFn();
    
  }, []);
  return (
    <div>
      {
        recipe&& <h3>{recipe.title}</h3>
      }
    </div>
  )
}

export default RecipeDetails