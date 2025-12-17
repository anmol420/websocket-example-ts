import type { Server } from "bun";
import app from "../app";
import type { WSData } from "./wsData.types";

const appFetch = async (request: Request, server: Server<WSData>): Promise<Response | undefined> => { 
  const url = new URL(request.url);
  if (url.pathname.startsWith("/ws")) {
    server.upgrade(request, {
      data: {
        message: "Hello Socket",
        path: url.pathname,
      }
    });
    return;
  }
  return app.fetch(request);
};

export default appFetch;