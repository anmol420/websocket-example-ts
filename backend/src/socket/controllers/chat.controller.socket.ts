import { Types } from "mongoose";
import { Message } from "../../models/message.model";
import type { SocketResponse } from "../../utils/types/socketResponse.type";
import { Room } from "../../models/room.model";

export const sendMessage = async (roomId: Types.ObjectId, userId: Types.ObjectId, content: string): Promise<SocketResponse> => {
  const ifRoomExists = await Room.findById(roomId);
  if (!ifRoomExists) {
    throw new Error("Message not found");
  }
  const message = await Message.create({
    chatRoom: ifRoomExists._id,
    sender: userId,
    content: content,
  });
  if (!message) {
    throw new Error("Failed to send message");
  }
  try {
    await Room.findByIdAndUpdate(ifRoomExists._id, {
      $push: { messages: message._id },
    });
    await message.populate("sender", "_id username email");
    return {
      sender: (message.sender as any).username,
      content: message.content,
      createdAt: message.createdAt ? message.createdAt : new Date(),
    }
  } catch (error: any) {
    throw new Error("Error in updating room:", error.message);
  }
};