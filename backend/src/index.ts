import app from "./app";
import { connectDB } from "./db/db";

connectDB()
  .then(() => {
    Bun.serve({
      fetch: app.fetch,
      port: 3000,
    });
    console.log("Server is running on http://localhost:3000");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });