const express=require("express")
const {Register,Login}=require("../controller/auhController")
const router=express.Router()
router.post("/register",Register);
router.post("/login",Login)