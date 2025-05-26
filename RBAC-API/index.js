const express=require("express")
const dotenv=require("dotenv").config();
const dbConnect=require("./config/databaseconnect")
const app=express();
app.use(express.json)
dbConnect()
const PORT=process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("server is running")
})
