import { Socket } from "socket.io";
import { JWTPayload } from "hono/utils/jwt/types";
import { verify } from "hono/jwt";
import { User } from "../models/user.model";

const socketMiddleware = async (socket: Socket, next: Function) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error('Unauthorized'));
  }
  let decoded: JWTPayload;
  try {
    decoded = await verify(token, Bun.env.JWT_SECRET as string);
  } catch (error) {
    return next(new Error('Invalid token'));
  }
  const userId = decoded?.userId;
  if (!userId) {
    return next(new Error('Invalid token'));
  }
  const user = await User.findById(userId).select("_id username email").lean();
  if (!user) {
    return next(new Error('User not found'));
  }
  socket.data.user = user;
  await next();
};

export { socketMiddleware };