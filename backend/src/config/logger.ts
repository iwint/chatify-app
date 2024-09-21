import winston from "winston";
import envConfig from "./env";

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: envConfig.env === "development" ? "debug" : "info",
    format: winston.format.combine(
        enumerateErrorFormat(),
        envConfig.env === "development" ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${JSON.stringify(message, null, 2)}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ["error"],
        }),
    ],
});

export default logger;
