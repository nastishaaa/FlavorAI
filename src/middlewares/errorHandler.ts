import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (createHttpError.isHttpError(err)) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  } else if (err.code === 'P2002') {
    res.status(409).json({
      status: 409,
      message: 'Email already registered',
    });
  } else {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
  }
}

export default errorHandler;
