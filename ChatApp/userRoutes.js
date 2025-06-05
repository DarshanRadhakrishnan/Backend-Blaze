const express=require("express")
const router=express.Router();
const {createUser,loginUser,allUsers}=require("../controllers/userController")
const {protect}=require("../middlewares/verifyToken")
router.post("/",createUser);
router.get("/",protect,allUsers);
router.post("/login",loginUser);
module.export=router;