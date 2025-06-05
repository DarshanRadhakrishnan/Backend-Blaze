const asynchandler=require("express-async-handler")

const accessChat = asynchandler(async (req, res) => {//in this function we return the chats if avilable or create a new one and before returning we populate the users and the latest message senders from the ids to the objects
    const { userId } = req.body;//this has the id of the user whom I have to create a new chat if no chat is available or return the latest if avaialable
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {//here we give User.populate because the details are fetched from the user (ie) we arw doing nothing but in isChat we have multiple chats there we are going to each chat then into latest message which will have the id then into the sender of the latest messag and populate the sender which has a user id to the user object with selected components respectively
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);//if a chat is avialable we return the lastest one
    } else {
      var chatData = {//we create a data
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );//we should populate as usual the list of user ids to user objects ith Chat instance created 
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  });
  

/*🔹 Find all chats where the currently logged-in user is a participant.
users is an array of ObjectIds — $elemMatch checks if req.user._id exists in that array.*/
const fetchChats = asynchandler(async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")//these populates are just like joins in sql originally the chats iwll have userIds onlyy but for front end requirements we will populate them and send
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })//recently updated chats first
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


const createGroupChat=asynchandler(async (req,res)=>{
    if(!req.body.users || !req.body.name){
        res.status(400).json({message:"Please fill all the fields"})
    }
    var users=req.body.users;
    if(users.length<2){
        res.status(400).json({message:"Group need more than two persons"})
    }
    users.push(req.user._id)
    try{
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
          });      
          const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
      
          res.status(200).json(fullGroupChat);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
})


module.exports={accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup}