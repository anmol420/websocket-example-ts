import type { Server } from "bun";
import type { Server as Engine } from "@socket.io/bun-engine";
import app from "../app";

const appFetch = (engine: Engine) =>
  async (
    request: Request,
    server: Server<any>
  ): Promise<Response | undefined> => {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/socket.io/")) {
      return engine.handleRequest(request, server);
    }

    return app.fetch(request);
  };

export default appFetch;