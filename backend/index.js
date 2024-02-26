const express=require('express');
const cors=require("cors")
const mainRouter=require("./routes/index.js")


const app=express();
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));
app.use(express.json());//parse the json given(json to object)
app.use("/api/v1",mainRouter) //another usecases of app.use()


app.listen(3000,()=>{console.log("app is listening...")});