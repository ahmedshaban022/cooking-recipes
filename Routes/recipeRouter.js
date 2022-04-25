const express=require('express');
const { getUserRecipes, createRecipe, editRecipe, deleteRecipe } = require('../Controllers/recipeCtr');
const auth = require('../midlwares/auth');
const router=express.Router();

router.route('/').get(auth,getUserRecipes).post(auth,createRecipe);
router.route('/:id').put(auth,editRecipe).delete(auth,deleteRecipe);




module.exports=router