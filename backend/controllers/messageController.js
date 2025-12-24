import Message from "../models/Message.js";
import User from "../models/User.js"

//Get all users except for logged in  user 
export const getUsersForSidebar  = async ()=>{
    try{
      const userId = req.user._id;
      const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

      const unseenMessages = {}
      const promises = filteredUsers.map(async (user)=>{
        const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
         if(messages.length > 0){
            unseenMessages[user._id] = messages.length;

         }
      })
      await Promise.all(promises);
      res.json({success: true, users: filteredUsers, unseenMessages})
    }catch(error){
        console.log(error.message);
      res.json({success: false, message: error.message})

    }
}


//Get all messages  for selected user 
export const getMessages  = async(req,res) =>{
    try{
        const{ id: selectedUserId } = req.params;
        
    } catch(error){
        console.log(error.message);
        res.json({success: false,message: error.message})
    }
}
