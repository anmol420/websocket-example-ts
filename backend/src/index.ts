import { connectDB } from "./db/db";
import appFetch from "./utils/appFetch";
import { websocket, engine } from "./socket/socket";

connectDB()
  .then(() => {
    Bun.serve({
      fetch: appFetch(engine),
      idleTimeout: 30,
      port: 3000,
      websocket: websocket,
    });
    console.log("Server is running on http://localhost:3000");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
