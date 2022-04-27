const router = require("express").Router();
const cloudinary = require('cloudinary');
const auth = require('../midlwares/auth');
const fs= require("fs");
////////////////////////////////
const { route } = require("express/lib/application");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
});

router.post("/upload-img",auth,async(req,res)=>{
    try {
       
        if(!req.files || Object.keys(req.files).length===0) return res.status(400).json({msg:"No files found"});
        const file = req.files.img;
        if(file.size > 1024*1024){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg:"File size must be less than 1 MB !"});
        } ;
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
            removeTmp(file.tempFilePath);
            return res.status(400).json({msg:"File format is incorrect !"});
        };

        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            {folder:"AIM-Tech"},
            async(err,result)=>{
                removeTmp(file.tempFilePath);
                res.json({public_id:result.public_id,url:result.secure_url});
                if(err) console.log(err);
            }
        );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg:error.message})
    }
});

router.post('/delete-img',auth,async(req,res)=>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg:"No Image Selected"});
        cloudinary.v2.uploader.destroy(public_id,async(err,result)=>{
            if(err) return res.status(500).json({msg:err});
            res.json({msg:"image Deleted"})
        })

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:error.message})
    }
})





 function removeTmp  (path) {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  };

  module.exports=router;