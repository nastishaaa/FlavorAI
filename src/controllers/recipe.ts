import { Request, Response, NextFunction } from 'express';
import {
    getAllRecipes,
    getRecipeById,
    getRecipeByAuthor,
    createRicep
} from '../services/recipe';

export const getAllRecipesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const recipes = await getAllRecipes();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}

export const getRecipeByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const recipe = await getRecipeById(id);
        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
}

export const getRecipeByAuthorController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorId = parseInt(req.params.authorId);
        const recipes = await getRecipeByAuthor(authorId);
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}

export const createRecipeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const recipe = await createRicep(payload);
        res.status(201).json(recipe);
    } catch (error) {
        next(error);
    }
}
