import { Router } from "express";
import authRouter from "./auth";
import recipesRouter from "./recipe";

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);

export default router;