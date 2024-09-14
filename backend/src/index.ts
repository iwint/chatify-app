import dotenv from 'dotenv';
import ExpressConfig from './config/express';
import envConfig from './config/env';
import mongoose from 'mongoose';
import logger from './config/logger';
import { Server } from 'node:http';
dotenv.config();

const app = ExpressConfig();
const port = envConfig.port;

let server: Server;
const { url, options } = envConfig.database;
mongoose.connect(url).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(port, () => {
        logger.info(`Listening to http://localhost:${port}`);
    });
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
