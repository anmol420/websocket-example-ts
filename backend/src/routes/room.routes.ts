import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.middlware";
import { roomController } from "../controllers/room.controller";

const roomRouter = new Hono()

roomRouter.get('/', authMiddleware, roomController.getRoom);

export default roomRouter;