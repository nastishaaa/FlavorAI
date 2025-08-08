import createHttpError from "http-errors";
import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = createHttpError(404, "Route not found");
    next(error); 
};