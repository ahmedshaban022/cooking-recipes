import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const RecipesAPI = () => {
    const [recipes,setRecipes]=useState([]);
    const token=localStorage.getItem('token');

    const getRecipes=async()=>{

       await axios.get('api/recipes',{headers:{authorization:token}}).then(res=>{
            
            setRecipes(res.data.recipes);
        }).catch(err=>{
            return toast.error(err.response.data.msg)
            
        })
    }
    useEffect(()=>{
    if(!token){return false}
    getRecipes();
});

  return (
    [recipes,setRecipes]
  )
}

export default RecipesAPI