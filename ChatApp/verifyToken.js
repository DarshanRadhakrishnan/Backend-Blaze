const AsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");
const { SECRET } = require("../config/constants");
const User=require("../models/userModel");
const protect=AsyncHandler(async (req,res,next)=>{
    let token=res.cookie.accesstoken;
    if(!token){
        res.status(400).json("User Not validated");
        throw new Error();
    }
    try{
        const decoded=jwt.verify(token,SECRET);
        req.user=await User.findById(decoded.id).select(-password);
        next();
    }catch(err){
        console.log(err);
        throw new Error();
    }
})
module.exports={protect}