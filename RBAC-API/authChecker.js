//all middlewares except error handlers will be of format (req,res,next) 
const authchecker=async (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.role)){
            res.status(400).json({message:"Your not aloowed to access this"})
        }
        next();
    }
}
module.exports=authchecker