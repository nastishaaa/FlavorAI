export type RecipePayload = {
    id: number
    title: string
    description: string | null  
    ingredients: string
    cookingInstructions: string
    createdAt: Date
    updatedAt: Date
    authorId: number
}


export type CreateRecipePayload = {
    title: string
    description?: string
    ingredients: string
    cookingInstructions: string
    authorId: number
}

export type CreateUserPayload = {
    name: string
    email: string
    password: string
}

export type UserPayload = {
    id?: number | null,
    name: string,
    email: string,
    password: string,
    recipes?: RecipePayload[] | [],
}

export type UserJwtPayload = {
    id: number
    email: string
}

