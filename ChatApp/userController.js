const asynchandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const nodemailer=require("nodemailer");
const User=require("../models/userModel");
const { SECRET } = require("../config/constants");
var transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"darshan2005rv@gmail.com",
        password:"DARSHAN"
    }
})

const registerUser = asynchandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
        var mailOptions={
            from:"darshan2005rv@gmail.com",
            to:{email},
            subject:"Chat App password reminder",
            html:<div>
            <h1>PassWord stored is availabe below</h1>
            <p>password : {password}</p>
            </div>
        }
        transport.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error);
            }else{
                console.log(info.response);
            }
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });


const loginUser=asynchandler(async (req,res)=>{
    const {email,password}=req.body
    const user=User.findOne({email})
    if(!user){
        res.status(400).json({message:"User Not Found Please Register"})
        throw new Error();
    }
    if(!user.matchedPassword(password)){
        res.status(400).json({message:"Incorrect Password"});
        throw new Error();
    }
    const token =jwt.sign({id:user._id},SECRET,{expiresIn:"30d"});
    res.cookie("accesstoken",token,{
        httpOnly:true,
    }).status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    })
})


const allUsers=asynchandler(async (req,res)=>{
    const keyWord=req.query.search?{
        $or:[
            {name:{$regex :req.query.search,$options:"i"}},
            {name:{$regex :req.query.search,$options:"i"}},
        ],
    }:{};
    const users=await User.find().find({_id:{$ne:req.user._id}});//here the keyword that we used here is a mongoose find pbject and multiple "find" tags are just used for filtering purposes
    res.send(users);
}
)


module.exports={registerUser,loginUser,allUsers}