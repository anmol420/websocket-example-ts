import { Context } from "hono";
import { Room } from "../models/room.model";
import { Message } from "../models/message.model";

class MessageController {
  async getRoomMessage(c: Context) {
    const { roomID } = await c.req.json();
    if (!roomID) {
      return c.json({ message: 'Missing roomID field' }, 400);
    }
    const user = c.get('user');
    if (!user) {
      return c.json({ message: 'User not found' }, 404);
    }
    const room = await Room.findById(roomID).populate('participants');
    if (!room) {
      return c.json({ message: 'Room not found' }, 404);
    }
    if (!room.participants.some(id => id.equals(user._id))) {
      return c.json({ message: 'User not a participant of the room' }, 403);
    }
    const messages = await Message.find({ chatRoom: roomID })
      .sort({ createdAt: -1 })
      .limit(100);
    try {
      return c.json({ message: 'Room messages retrieved successfully', roomMessages: messages }, 200);
    } catch (error) {
      return c.json({ message: 'Error retrieving room messages', error }, 500);
    }
  }
}

export const messageController = new MessageController();