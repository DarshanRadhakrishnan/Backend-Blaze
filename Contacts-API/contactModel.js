const mongoose=require("mongoose");
const model=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,//It's saying that this schema has a field named user_id, and it’s related to another collection called User.This tells Mongoose that the user_id references the _id field of documents in the "User" collection. This is used to set up relationships (i.e., foreign keys
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"PLease add the contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add the contact email adress"]
    },
    phone:{
        type:Number,
        required:[true,"pLease enter the string"]
    }
    
},
{
    timestamps:true
}
);
module.exports=mongoose.model("Contact",model);