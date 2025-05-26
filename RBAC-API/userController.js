const Admin=async (req,res)=>{
    res.status(200).json({message:"Welcome Admin"})
}
const Manager=async (req,res)=>{
    res.status(200).json({message:"welcome Manager"})
}
const User=async (req,res)=>{
    res.status(200).json({message:"Welcome User"})
}
module.exports={Admin,Manager,User}