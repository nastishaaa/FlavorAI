import { Router } from "express";
import { createRecipeController, getAllRecipesController, getRecipeByAuthorController, getRecipeByIdController } from "../controllers/recipe";
import { authenticate } from "../middlewares/authorization";

const recipesRouter = Router();

recipesRouter.get('/', getAllRecipesController);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.get('/:authorId', authenticate, getRecipeByAuthorController);
recipesRouter.post('/create', authenticate, createRecipeController);

export default recipesRouter;