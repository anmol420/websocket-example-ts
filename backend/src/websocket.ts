import type { WebSocketHandler } from "bun";
import type { WSData } from "./utils/wsData.types";

export const websocket: WebSocketHandler<WSData> = {
  open(ws) {
    console.log("WS connected:", ws.data.path);
  },

  message(ws, message) {
    ws.send(`Hello from ${ws.data.path}`);
  },

  close(ws) {
    console.log("WS closed:", ws.data.path);
  },
};