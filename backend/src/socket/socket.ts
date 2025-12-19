import { Server } from "socket.io";
import { Server as Engine } from "@socket.io/bun-engine";

const io = new Server({
  pingInterval: 25000,
  pingTimeout: 20000,
});

const engine = new Engine();
io.bind(engine);

io.on("connection", socket => {
  console.log("Socket connected:", socket.id);

  socket.on("ping_test", data => {
    console.log("ping_test:", data);
    socket.emit("pong_test", { msg: "pong from server" });
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