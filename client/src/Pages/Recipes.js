import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { setRecipesAction } from '../store/actions/recipesActions';
import Recipe from '../Components/Recipe';

const Recipes = () => {
  
  const navigate=useNavigate();
  const recipes=useSelector(state=>state.recipes);
  const [Recipes,setRecipes]=useState([])


  const dispatch=useDispatch();
  useEffect(() => {
    let token=localStorage.getItem('token')
    if(!token){return navigate('/login');}  
   
   

      axios.get('api/recipes',{headers:{authorization:token}}).then(res=>{
        dispatch(setRecipesAction(res.data.recipes));
        setRecipes(res.data.recipes);
      }).catch(err=>{
        return toast.error(err.response.data.msg)

      })
    
  }, []);



  return (
    <div className='container'>
<h4 className='text-muted '>{Recipes.length} Recipes</h4>
    
    <Recipe Recipes={Recipes} setRecipes={setRecipes}/>
     
    </div>
  )
}

export default Recipes