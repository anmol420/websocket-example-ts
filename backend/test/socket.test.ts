import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected");
  socket.emit("ping_test", { msg: "hello server" });
});

socket.on("pong_test", data => {
  console.log("pong received:", data);
  socket.disconnect();
});