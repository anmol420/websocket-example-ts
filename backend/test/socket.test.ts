import { io } from "socket.io-client";

console.log("Starting socket.io client test...");

const socket = io("http://localhost:3000", {
  auth: {
    token: Bun.env.TEST_JWT_TOKEN as string,
  },
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to server with ID:", socket.id);
});

socket.on("ready", () => {
  console.log("Server ready, sending message...");
  socket.emit("send_message", "Helloo again");
});

socket.on("new_message", (data) => {
  console.log("New message received:", data);

  setTimeout(() => {
    socket.disconnect();
    process.exit(0);
  }, 500);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from server:", reason);
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});
