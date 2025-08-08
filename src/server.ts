import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import { notFoundHandler } from './middlewares/notFoundHandler';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;


export const StartServer = () => {

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use('/', router);
    app.use(pino({
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }));
    app.use(errorHandler);
    app.use(notFoundHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}