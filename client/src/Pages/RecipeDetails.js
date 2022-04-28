import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GlobalState } from '../GlobalState';


const RecipeDetails = () => {
  const navigate=useNavigate();
  const state=useContext(GlobalState);
  const [Recipes,setRecipes]=state.recipesAPI;
  const param=useParams();
  const [recipe,setRecipe]=useState({});
  
  const getRecipeFromParam=(item)=>{
    for(let i=0; i<Recipes.length;i++){  
      Recipes[i]._id===param.id && setRecipe({...Recipes[i]});  
      console.log(Recipes[i])   
    };
  }


  useEffect(() => {
    if(!localStorage.getItem('token'))navigate('/login'); 
    getRecipeFromParam();
    
  }, []);






  const removeRecipe=async()=>{
    try {
        let token=localStorage.getItem('token');

        await axios.post('/api/image/delete-img',{public_id:recipe.image.public_id},{headers:{authorization:token}})
          
         await axios.delete(`/api/recipes/${recipe._id}`,{headers:{authorization:token}});
        toast.success('Recipe Deleted');
        let newRecipes=Recipes.filter(R=>R._id!==recipe._id);
            setRecipes([...newRecipes]);
            setRecipe(false)
        
    } catch (err) {
        toast.error(err.response.data.msg)
    }
}
  return (
   recipe.image ?
   <div className='container'>
      <div className='row m-3' >
      <div className='col-md-7'>
       <div className='w-100'>
        <img className='w-100 rounded' src={recipe.image.url} alt={recipe.title}/>
       </div>
      </div>
      <div className='col-md-5'>
        <div className=' my-5'> <h4 className='text-muted'>{recipe.title}</h4></div>
        <div>
       <div className='my-5' >
       <h4 className='text-muted'>Ingredient</h4>
          <p className='m-2'>{recipe.ingredient}</p>
       </div>
        <div className='mt-3'>
        <h4 className='text-muted'>Recipe</h4>
          <p className='m-2'>{recipe.recipe}</p>
        </div>
        </div>
        <div className='buttons'>
            <div className='mt-5'>
              <button className='btn btn-danger m-2' onClick={removeRecipe}>Remove</button>
              


              <>
  {/* Button trigger modal */}
  <button
    type="button"
    className="btn btn-info"
    data-bs-toggle="modal"
    data-bs-target="#staticBackdrop"
  >
    Edit
  </button>
  {/* Modal */}

  <div
    className="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabIndex={-1}
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="staticBackdropLabel">
            Edit Recipe
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
        

        
        
        
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</>




            </div>
        </div>
      </div>
      </div>
    </div>:<h2>No Recipe Selected</h2>
  )
}

export default RecipeDetails