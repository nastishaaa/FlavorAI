import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/auth";

const authRouter = Router();

authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);

export default authRouter;