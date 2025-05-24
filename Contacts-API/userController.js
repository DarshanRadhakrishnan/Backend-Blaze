//@desc Register a user
//@route POST /api/users/register
//@access public
const asyncHandler=require("express-async-handler")
const User=require("../models/userModel")
const bcrypt=require("bcrypt");
const { use } = require("../routes/contactRoutes");
const jwt=require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered!");
    }
    const hashedPassword=bcrypt.hash(password,10);
    const user=User.create({
        username,
        email,
        password:hashedPassword
    })
    //on creating a database collection (here user) attributes like id and many things will be created automatically and these are unique
    if(user){
        res.status(200).json({
            _id:user.id,
            email:user.email
        })
    }else{
        res.status(404);
        throw new Error("Unable to create User")
    }
    res.json({ message: "Register the user" });
  });
  

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fielsds are Mandatory")
    }
    const user=User.findOne({email});//you have to pass in an object as a parameter to search among the documents
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
    )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is wrong")
    }

    res.json({ message: "login user" });
});

//@desc current
//@route POST /api/users/current
//@access private "WE HAVE MADE THIS PRIVATE BECAUSE ONLY A USER WHO HAS LOGGED IN CAN ACCESS THIS ROUTE"
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports = { registerUser, loginUser,currentUser};