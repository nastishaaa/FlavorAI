import createHttpError from "http-errors";
import { prisma } from "../../prisma/client";

import type {RecipePayload, CreateRecipePayload} from '../types/userTypes'

export const getAllRecipes = async (): Promise<RecipePayload[]> => {
    const rec = await prisma.recipe.findMany();
    return rec;
}

export const getRecipeById = async (id: number): Promise<RecipePayload> => {
    const rec = await prisma.recipe.findUnique({
        where: { id }
    });

    if (!rec) {
        throw createHttpError(404, 'Recipe not found!');
    }

    return rec;
}

export const getRecipeByAuthor = async (authorId: number): Promise<RecipePayload[]> => {
    const rec = await prisma.recipe.findMany({
        where: { authorId },
    });

    if (!rec) {
        throw createHttpError(404, 'User has not created any recipes yet.');
    }

    return rec;
}

export const createRicep = async (payload: CreateRecipePayload): Promise<RecipePayload> => {
    const rec = await prisma.recipe.create({ data: payload });
    return rec;
}