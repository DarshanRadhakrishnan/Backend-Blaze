const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema = mongoose.Schema(
    {
      name: { type: "String", required: true },
      email: { type: "String", unique: true, required: true },
      password: { type: "String", required: true },
      pic: {
        type: "String",
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestaps: true }
  );
userSchema.methods.matchPassword=async (enterdPassword)=>{
    const comp= await bcrypt.compare(enterdPassword,this.password);
    return comp;
}
userSchema.pre("save",async (next)=>{
    if(this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
module.exports=mongoose.model("User",userSchema);
