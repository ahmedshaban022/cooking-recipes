import React, { createContext } from 'react'
import RecipesAPI from './apis/RecipesAPI';

export const GlobalState=createContext();
export const ContextProvider = ({children}) => {
    ;

const state={
    recipesAPI:RecipesAPI(),
    
}

  return (
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
  )
}
