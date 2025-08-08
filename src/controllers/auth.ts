import { Request, Response, NextFunction } from 'express'
import { loginUser, registerUser } from '../services/auth'
import createHttpError from 'http-errors'

export const loginUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw createHttpError(400, 'Email and password are required');
        }

        const { user, token } = await loginUser(email, password);

        res.status(200).json({
            status: 200,
            data: { user, token },
            message: 'User logged in successfully'
        });
    } catch (error) {
        next(error);
    }
}


export const registerUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Register body:', req.body);

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw createHttpError(400, 'Name, email and password are required');
        }

        const { user, token } = await registerUser({ name, email, password });

        res.status(201).json({
            status: 201,
            data: { user, token },
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}