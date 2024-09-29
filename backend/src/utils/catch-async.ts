import { NextFunction, RequestHandler } from "express";

interface RequestParams {
    req: any;
    res: any;
    next: NextFunction;
}

const catchAsync = (fn: RequestHandler) => (req: any, res: any, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
