import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
  const navigate=useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token'))navigate('/login');  
  }, []);
  return (
    <div>RecipeDetails</div>
  )
}

export default RecipeDetails