import { Hono } from "hono";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middlware";

const userRouter = new Hono();

userRouter.post('/create', userController.createUser);
userRouter.post('/login', userController.loginUser);

userRouter.post('/logout', authMiddleware, userController.logoutUser);
userRouter.get('/profile', authMiddleware, userController.getUserProfile);

export default userRouter;