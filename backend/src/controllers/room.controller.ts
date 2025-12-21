import { Context } from "hono";
import { Room } from "../models/room.model";

class RoomController {
  async getRoom(c: Context) {
    const user = c.get("user");
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    let rooms = [];
    rooms = await Room.find({ participants: user._id }).sort({ updatedAt: -1 }).select("_id name");
    try {
      return c.json({ message: "Rooms retrieved successfully", rooms: rooms }, 200);
    } catch (error) {
      return c.json({ message: "Error retrieving rooms", error }, 500);
    }
  }
}

export const roomController = new RoomController();