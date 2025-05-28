const express=require("express")
const dbConnect=require("./config/dbConnect")
const {PORT}=require("./config/utils")
const router = require("./routers/userRoutes")
const app=express()
app.use(express.json())
app.use("api/projects",router)
dbConnect()
app.listen(PORT,()=>{
    console.log(`Server is Running on PORT : ${PORT} `);
})