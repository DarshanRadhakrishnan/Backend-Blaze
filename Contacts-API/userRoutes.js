const express=require("express");
const validateToken = require("../middlewares/validateToken");
const {registerUser,loginUser,currentUser}=require("../controllers/userController");
const router=express.Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/current",validateToken,currentUser)//so here we do not use the validateToken midleware for register and login routes but for accessing the current router we need to be login properly
//so when we login we create a web token then to access the current we pass this token and we validate it here using the middleware 
//of its correct token we allow the access else not
//hence we have made this router private
module.exports=router;