const { default: mongoose } = require("mongoose");
const {MONGO_URL}=require("../config/constants");
const DBconnect=async ()=>{
    try{
        const connect= await mongoose.connect(MONGO_URL);
        console.log(`Database is Connected to ${connect.connection.host}`);
    }catch(err){
        console.log(err);
    }
}
module.exports=DBconnect