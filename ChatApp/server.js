const express=require("express");
const DBconnect = require("./config/dbConnect");
const errorHandler = require("./middlewares/errorHandler");
DBconnect();
const app=express();
app.use(errorHandler);
app.listen(8000,(req,res)=>{
    console.log(`listening to port 8000`)
})
app.use(express.json())
