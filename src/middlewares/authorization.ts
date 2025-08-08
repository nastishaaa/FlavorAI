import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';

interface JwtPayload {
    id: number;
    email: string;
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createHttpError(401, 'Authorization token missing or malformed');
        }

        const token = authHeader.split(' ')[1];
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment');
        }

        const decoded = jwt.verify(token, secret) as JwtPayload;

        (req as AuthenticatedRequest).user = decoded;

        next();
    } catch (error) {
        next(createHttpError(401, 'Invalid or expired token'));
    }
}
