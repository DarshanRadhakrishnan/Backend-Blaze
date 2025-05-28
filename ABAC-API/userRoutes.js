const express=require("express")
const router=express.Router()
const {viewProject,updateProject}=require("../controllers/usercontroller")
router.get("/:id",validateToken,viewProject)
router.put("/:id",validateToken,updateProject)
module.exports=router