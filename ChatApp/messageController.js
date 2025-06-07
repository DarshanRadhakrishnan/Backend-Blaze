const Message=require("../models/messageModel")
const asynchandler=require("express-async-handler");
const userModel = require("../models/userModel");
const { populate } = require("dotenv");
const allMessages=asynchandler(async (req,res)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId })
          .populate("sender", "name pic email")
          .populate("chat");
        res.json(messages);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
});

const sendMessage=asynchandler(async (req,res)=>{
    const {content,chatId}=req.body;
    if(!content||!chatId){
        res.status(400)
        throw new Error("invalid fields")
    }
    const newmessage={
        sender:user._id,
        content:content,
        chat:chatId
    }
    try{
        const message=await Message.create(newmessage)
    const fullMessage=await Message.populate("sender","name pic email").populate({
        chat,
        populate:{
            path:"users",
            select:"name pic email"
        }
    })
    await Chat.findByIdandUpdate(chatId,
        {
            latestMessage:message._id
        },{
            new:true
        }
    )
    res.json(fullMessage);
}catch(err){
        res.status(400)
        throw new Error(err.message)
    }
})
    



module.exports = { allMessages, sendMessage };