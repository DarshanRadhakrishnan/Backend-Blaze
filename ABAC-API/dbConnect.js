const mongoose=require("mongoose")
const {MONGO_URL}=require("../config/utils")
const dbConnect=async ()=>{
    try{
        const connect=await mongoose.connect(MONGO_URL)
        console.log(`Database Connected:${connect.connection.host}`);
    }catch(err){
        console.log("database cannot be connected");
    }
}
module.exports=dbConnect