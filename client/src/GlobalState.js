import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
// import RecipesAPI from './apis/RecipesAPI';

export const GlobalState=createContext();
export const ContextProvider = ({children}) => {
  const token=localStorage.getItem('token');
  const [recipes,setRecipes]=useState([]);
  const [callBack,setCallBack]=useState(false);

  const getRecipes=async()=>{

    await axios.get('api/recipes',{headers:{authorization:token}}).then(res=>{
         
         setRecipes(res.data.recipes);
     }).catch(err=>{
         return toast.error(err.response.data.msg)
         
     })
 }
 
 useEffect(()=>{
  if(token){
 
    getRecipes();
  }
},[callBack])

const state={
    recipesAPI:[recipes,setRecipes],
    callBack:[callBack,setCallBack],
}

  return (
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
  )
}
