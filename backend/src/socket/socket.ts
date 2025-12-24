import { Server } from "socket.io";
import { Server as Engine } from "@socket.io/bun-engine";
import { socketMiddleware } from "../middlewares/socket.middleware";
import { Room } from "../models/room.model";
import { SocketResponse } from "../utils/types/socketResponse.type";
import { sendMessage } from "./controllers/chat.controller.socket";

const io = new Server({
  pingInterval: 25000,
  pingTimeout: 20000,
});

const engine = new Engine();
io.bind(engine);

io.use(socketMiddleware);

io.on("connection", async socket => {
  console.log("Socket connected:", socket.id);

  const room = await Room.findById(Bun.env.GLOBAL_ROOM_ID);
  if (!room) {
    console.error("Global room not found");
    return;
  }
  
  socket.join(room._id.toString());
  console.log(`Socket ${socket.id} joined room ${room._id.toString()}`);
  
  socket.emit("ready");
  
  socket.on("send_message", async (content: string) => {
    const user = socket.data.user;
    if (!user) {
      console.error("User data not found in socket");
      return;
    }
    const data: SocketResponse = await sendMessage(room._id, user._id, content);
    io.to(room._id.toString()).emit("new_message", data);
  });

  socket.on("disconnect", reason => {
    console.log("Socket disconnected:", reason);
  });
});

const { websocket } = engine.handler();

export {
  engine,
  websocket,
};