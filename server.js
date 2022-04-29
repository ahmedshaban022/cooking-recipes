const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const fileUpload= require('express-fileupload');
const connectToDB=require('./DB');
const path=require('path');
dotenv.config();
connectToDB()

app.use(express.json());
app.use(cors())
app.use(fileUpload({useTempFiles:true}))

app.use('/api/recipes',require('./Routes/recipeRouter'));
app.use('/api/users',require('./Routes/userRouter'));
app.use('/api/image',require('./Routes/uploadIMG'));


app.use(express.static('client/build'));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'))
})


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`listingin on PORT ${PORT}`)})