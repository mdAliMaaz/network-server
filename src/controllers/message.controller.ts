import { NextFunction } from "express";
import Conversation from "../models/conversation.mode";
import Message from "../models/message.model";
import { CustomResponse } from "../utils/Response";
import { getReceiverSocketId, io } from "../socket";

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

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res
      .status(201)
      .json(new CustomResponse(201, "message sent", "", newMessage));
  } catch (error: any) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMessages = async (req: any, res: any) => {
  try {
    const userToChatId = req.params.id;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error: any) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
