const Recipes=require('../Models/recipe');

const getUserRecipes=async(req,res)=>{
    try {
       const recipes=await Recipes.find({userId:req.user._id});
       res.json({msg:"success",recipes});

    
    } catch (error) {
        console.log(error.message)
    }
}

const createRecipe=async(req,res)=>{
    try {
        const {title,ingrediant,recipe,image,userId}=req.body;
        if(!title|| !ingrediant|| !recipe|| !image|| !userId) return res.stauts(400).json({msg:"Missing feilds!"})
       
        const newRecipe=await new Recipes({
            title,
            ingrediant,
            recipe,
            image,
            userId:req.user._id
        });
        await newRecipe.save();

        res.json({msg:"success",newRecipe});

    
    } catch (error) {
        console.log(error.message)
    }
}

const editRecipe=async(req,res)=>{
    try {
        const id=req.params.id;
        const {title,ingrediant,recipe,image,userId}=req.body;
        if(!title|| !ingrediant|| !recipe|| !image|| !userId) return res.stauts(400).json({msg:"Missing feilds!"})
        
        const oldRecipe=await Recipes.findById(id);
        if(!oldRecipe)return res.stauts(400).json({msg:"Recipe dosent exist"})
        if(oldRecipe.userId==req.user._id)
         {
            const updatedRecipe=await Recipes.findByIdAndUpdate({_id:id},{
                title,
                ingrediant,
                recipe,
                image,
                userId:req.user._id
                },{new:true});
                res.json({msg:'success',updatedRecipe});
        }
        else {
            res.status(400).json({msg:'Not allowed'});
        }

        
    } catch (error) {
      console.log(error.message);
      res.status(500).json({msg:error.message})  
    }
}
const deleteRecipe=async(req,res)=>{
    try {
        const id=req.params.id;
        
        const recipe=await Recipes.findById(id);
        if(!recipe)return res.status(400).json({msg:"Recipe dosent exist"})
        if(recipe.userId==req.user._id){
            await Recipes.findByIdAndDelete(id);
            res.json({msg:'Recipe Deleted '});
        }
        else {
            res.status(400).json({msg:'Not allowed'});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:error.message})  
    }
}




module.exports={getUserRecipes,createRecipe,editRecipe,deleteRecipe}