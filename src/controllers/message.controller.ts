import { NextFunction } from "express";
import Conversation from "../models/conversation.mode";
import Message from "../models/message.model";
import { CustomResponse } from "../utils/Response";

export async function sendMessages(req: any, res: any, next: NextFunction) {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const message = req.body.message;

    let conversation = await Conversation.findOne({
      participants: [senderId, receiverId],
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    
    res
      .status(201)
      .json(new CustomResponse(201, "message sent", "", newMessage));
  } catch (error: any) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMessages(req: any, res: any, next: NextFunction) {}
