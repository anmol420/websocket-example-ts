import { Context } from "hono";
import { verify } from "hono/jwt";
import { User } from "../models/user.model";
import { JWTPayload } from "hono/utils/jwt/types";

const authMiddleware = async (c: Context, next: Function) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
  let decoded: JWTPayload;
  try {
    decoded = await verify(token, Bun.env.JWT_SECRET as string);
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401);
  }
  const userId = decoded?.userId;
  if (!userId) {
    return c.json({ message: 'Invalid token' }, 401);
  }
  const user = await User.findById(userId).select("_id username email").lean();
  if (!user) {
    return c.json({ message: 'User not found' }, 404);
  }
  c.set('user', user);
  await next();
};

export { authMiddleware };