import express from "express";
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController";
import { protectRoute } from "../middlewares/auth";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id",protectRoute, sendMessage)


export default messageRouter;


