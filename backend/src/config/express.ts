import express, { Application } from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import routes from "../routes";
import { errorConverter, errorHandler } from '../middlewares/error';

const ExpressConfig = (): Application => {
    const app = express();
    app.use(compression());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", routes);
    app.use(errorHandler)
    app.use(errorConverter)
    return app;
};

export default ExpressConfig;
