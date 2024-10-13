import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
import mongoose from "mongoose";
import httpStatus, { INTERNAL_SERVER_ERROR } from "http-status";
import envConfig from "../config/env";
import logger from "../config/logger";

const errorConverter = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            err?.statusCode || err instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message } = err;
    if (envConfig.env === "production") {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;

    const response = {
        status: statusCode,
        message,
        ...(envConfig.env === "development" && { stack: err.stack }),
    };

    if (envConfig.env === "development") {
        logger.error(err);
    }
    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
