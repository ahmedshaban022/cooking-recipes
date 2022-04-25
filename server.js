const express=require('express');
const app=express();
const dotenv=require('dotenv');

const connectToDB=require('./DB');
dotenv.config();
connectToDB()

app.use(express.json());

app.use('/api/recipes',require('./Routes/recipeRouter'));
app.use('/api/users',require('./Routes/userRouter'));






const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`listingin on PORT ${PORT}`)})