import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Components/loader/Loader';
import { GlobalState } from '../GlobalState';



const AddRecipe = () => {

  const navigate=useNavigate();
  const [recipe,setRecipe]=useState({});
  const [img,setImg]=useState(false);
  const [loading,setLoading]=useState(false);
  const [token,setToken]=useState(localStorage.getItem('token'));
  const state=useContext(GlobalState);
  const [Recipes,setRecipes]=state.recipesAPI;


  useEffect(() => {
    
   
    if(!token)navigate('/login');  
  }, []);
  const removeImage=async ()=>{
    setLoading(true);
    try {
      let res=await axios.post('/api/image/delete-img',{public_id:img.public_id},{headers:{authorization:token}})
      if(res) {setLoading(false); setImg(false)}
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  const handleOnChange=({target})=>{
    setRecipe({...recipe,[target.name]:target.value});
  }
  const handleSubmit =async (e)=>{
    
    e.preventDefault();
    if(recipe.title && recipe.ingredient&& recipe.recipe)
    {
      if(img)
      {
        try {
          setLoading(true);
          let res= await axios.post('/api/recipes/',{...recipe,image:img},
          {headers:{authorization:localStorage.getItem('token')}});
          toast.success('Recipe Added');
          
         setRecipes([...Recipes,res.data.newRecipe])
          e.target.reset();
          setImg(false);
          setLoading(false);
          
          
        } catch (err) {
          setLoading(false);
          if(err) return toast.error(err.response.data.msg);
          
        }
        setLoading(false);
      }
    }
    else{
      toast.warning('missing feilds');
      setLoading(false);
    }
    
   
    setLoading(false);
  }
const handleUploadImg = async (e)=>{
  setLoading(true);
  const file = e.target.files[0];
  if(!file) return toast.error("File not exist");
  if(file.size > 1024 *1024) return toast.error("File size is larger than 1 MB");
  if(file.type !== 'image/jpeg' && file.type !== 'image/png') return toast.error("File format is incorrect");
  try {
    
    let formData = new FormData();
     formData.append('file',file);
    let res= await axios.post('/api/image/upload-img',formData,{
      headers:{'Content-Type': 'multipart/form-data',authorization:token}
    });
    setImg(res.data);
    setLoading(false);
  }
  catch (err) {
    setLoading(false);
    toast.error(err.response.data.msg);
  }
  setLoading(false);
}
  return (
    <div className='container'>
      <h2 className='text-muted'>New Recipe</h2>
      <div className='m-auto w-50 m-3 p-3 form-control'>

      <form  onSubmit={handleSubmit}>

      <div className="form-floating mb-3">
          <input type="text" name='title' onChange={handleOnChange}  className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Title</label>
        </div>

      <div className="form-floating">
        <textarea className="form-control mb-3" name='ingredient' onChange={handleOnChange} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
        <label htmlFor="floatingTextarea">Ingredient</label>
      </div>
        <div className="form-floating mb-3">
          <input type="text" onChange={handleOnChange} name='recipe' className="form-control" id="floatingInput" placeholder="name@example.com" />
          <label htmlFor="floatingInput">Recipe</label>
        </div>

              {
               loading ?
               <div className=' row '>
               <div className='col-12 d-flex justify-content-center'>
               <Loader/></div>
               </div>
                :img&&<div className=' '>
                  <button className='btn btn-danger mb-2 rounded-circle ' onClick={removeImage}>&times;</button>
                <img style={{width:'400px',height:'400px'}} className='   rounded-circle' src={img.url}/>
              </div>
                 
              }
        <div>
        <label htmlFor="formFileLg" className="form-label">Recipe dish photo</label>
        <input className="form-control form-control-lg" name='dish-image' onChange={handleUploadImg} id="formFileLg" type="file" accept='image/png, image/jpeg'/>
            </div>


          <div className="col-12  my-3">
        <button type="submit" className="btn btn-primary w-100" >Add Recipe</button>
          </div>
      </form>

      </div>

    </div>
  )
}

export default AddRecipe