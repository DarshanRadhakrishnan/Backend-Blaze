const jwt=require("jsonwebtoken")
const validate=async (req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        if(!token){
            res.status(400).json({message:"Token Not recieved"})
        }
        try{
            const decoded=jwt.verify(token,process.env.SECRET_CODE)
            req.user=decoded
            console.log("The required user is  ")
            next()//the calling of next here is highly important as this is the place where can execute the next function in the route
        }catch(err){
            res.status(400).json({message:"Token Is Invalid"})
        }
    }else{
        res.status(400).json({message:"Token Not Present"})
    }
}
module.exports=validate
