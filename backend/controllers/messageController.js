import User from "../models/User.js"
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap } from "../server.js";
import redis from "../lib/redis.js";
import { v4 as uuidv4 } from "uuid";



//Get all users except for logged in  user 
export const getUsersForSidebar  = async (req, res)=>{
    try{
      const userId = req.user._id;
      const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

      const unseenMessages = {}
      const promises = filteredUsers.map(async (user)=>{
        // Get all messages from Redis for this user pair
        const messagesKey = `messages:${user._id}:${userId}`;
        const messages = await redis.lRange(messagesKey, 0, -1);
        
        if(messages && messages.length > 0) {
          const unseenCount = messages.filter(msg => {
            const parsedMsg = JSON.parse(msg);
            return !parsedMsg.seen;
          }).length;
          
          if(unseenCount > 0){
            unseenMessages[user._id] = unseenCount;
          }
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
        const myId = req.user._id;

        // Get messages from both conversation directions in Redis
        const messagesKey1 = `messages:${myId}:${selectedUserId}`;
        const messagesKey2 = `messages:${selectedUserId}:${myId}`;
        
        const messages1 = await redis.lRange(messagesKey1, 0, -1);
        const messages2 = await redis.lRange(messagesKey2, 0, -1);
        
        const allMessages = [
          ...(messages1 || []).map(msg => JSON.parse(msg)),
          ...(messages2 || []).map(msg => JSON.parse(msg))
        ];
        
        // Sort by timestamp
        allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        // Mark messages from selectedUserId as seen
        if(messages2 && messages2.length > 0) {
          const updatedMessages = messages2.map(msg => {
            const parsedMsg = JSON.parse(msg);
            parsedMsg.seen = true;
            return JSON.stringify(parsedMsg);
          });
          
          await redis.del(messagesKey2);
          for(let i = 0; i < updatedMessages.length; i++) {
            await redis.rPush(messagesKey2, updatedMessages[i]);
          }
        }

        res.json({success: true, messages: allMessages})
    } catch(error){
        console.log(error.message);
        res.json({success: false,message: error.message})
    }
}


//api to marks messages  as seen  using message id 
export const markMessageAsSeen = async(req,res)=>{
    try{
     const { id: messageId } = req.params;
     
     // Get all message keys to find and update the message
     const keys = await redis.keys("messages:*");
     
     for(let key of keys) {
       const messages = await redis.lRange(key, 0, -1);
       let updated = false;
       
       for(let i = 0; i < messages.length; i++) {
         const msg = JSON.parse(messages[i]);
         if(msg._id === messageId) {
           msg.seen = true;
           await redis.lSet(key, i, JSON.stringify(msg));
           updated = true;
           break;
         }
       }
       
       if(updated) break;
     }
     
     res.json({success: true})
    }catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})

    }
}

//send message to selected user 
export const sendMessage = async(req,res) => {
    try {
        const {text, image} = req.body;
        const receiverId  = req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl  = uploadResponse.secure_url;
        }
        
        const newMessage = {
            _id: uuidv4(),
            senderId: senderId.toString(),
            receiverId: receiverId.toString(),
            text,
            image: imageUrl,
            seen: false,
            createdAt: new Date().toISOString()
        }

        // Store message in Redis list
        const messagesKey = `messages:${senderId}:${receiverId}`;
        await redis.rPush(messagesKey, JSON.stringify(newMessage));

        //Emit the new message to the  recieveer socket id  
        const recieverSocketId =  userSocketMap[receiverId]
        console.log("Receiver socket ID:", recieverSocketId, "for user:", receiverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
            console.log("Message emitted to receiver");
        }

        res.json({success: true, message: newMessage})
    } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message})
    }
}
