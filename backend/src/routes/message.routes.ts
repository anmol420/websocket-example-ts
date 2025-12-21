import { Hono } from "hono";
import { messageController } from "../controllers/message.controller";
import { authMiddleware } from "../middlewares/auth.middlware";

const messageRouter = new Hono()

messageRouter.post('/getRoomMessage', authMiddleware, messageController.getRoomMessage);

export default messageRouter;