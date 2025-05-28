const dotenv=require("dotenv").config();
const JWT_SECRET=process.env.JWT_SECRET
const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
module.exports={JWT_SECRET,PORT,MONGO_URL}