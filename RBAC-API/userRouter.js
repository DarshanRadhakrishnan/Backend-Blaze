const express=require("express");
const {Admin,Manager,User}=require("../controller/userController");
const validate=require("../middleware/validate")
const authchecker=require("../middleware/authChecker")
const router=express.Router()
//routes that only admin can access
router.post("/admin",validate,authchecker("Admin"),Admin);//by adding middleware we are protecting the routes and middlewares just have a code to check for potential errors and once after checkinga ll the things it just calls the next function
//routes that admin and manager can access
router.post("/managaer",validate,authchecker("Manager","Admin"),Manager);
//routes that all admin,user and manager can access
router.post("/User",validate,User);
