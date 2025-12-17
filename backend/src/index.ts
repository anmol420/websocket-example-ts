import { connectDB } from "./db/db";
import appFetch from "./utils/appFetch";
import type { WSData } from "./utils/wsData.types";
import { websocket } from "./websocket";

connectDB()
  .then(() => {
    Bun.serve<WSData>({
      fetch: appFetch,
      port: 3000,
      websocket: websocket,
    });
    console.log("Server is running on http://localhost:3000");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });
