const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const register=async (req,res)=>{
    try{
        const {userName,password,role}=req.body()
        const hashed_password=await bcrypt.hash(password,10);
        const user=new User({
            userName,
            password:hashed_password,
            role
        })
        await user.save()
        if(!user){
            res.status(404)
            res.json({message:"Not able to create a User"})
        }
        res.status(200).json({
            message:"SuccessFully registered the user Login to continue"
        })
    }catch(err){
        res.status(404);
        res.json({message:"Cannot register the User"})
    }
}
const login=async (req,res)=>{
   try{
    const {userName,password}=req.body();
    const user=User.findOne({userName})
    if(!user){
        res.status(400).json({
            message:"User Not Registered"
        })
    }
    if(!bcrypt.compare(user.password,password)){
        res.status(400).json({message:"Password is Incorrect"})
    }
    const token=jwt.sign({
        id:user._id,role:user.role
    },process.env.SECRET_CODE,
    {expiresIn:"1h"})
    res.status(200).json({token})
   }catch(e){
    res.status(404)
    res.json({message:"Login went wrong"})
   }
}
module.exports={register,login}