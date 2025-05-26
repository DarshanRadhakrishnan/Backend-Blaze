const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["User","Admin","Manager"]
    }
},{
    Timestamps:true
})
module.exports=mongoose.Model("User",userSchema);