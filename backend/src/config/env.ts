import Joi from "joi";
import config from "dotenv";
import path from "path";

if (config) config.config({ path: path.join(__dirname, "../../.env") });

const envValidationSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid("production", "development", "test").required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description("Mongo DB url"),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        SMTP_HOST: Joi.string().description("server that will send the emails"),
        SMTP_PORT: Joi.number().description("port to connect to the email server"),
        SMTP_USERNAME: Joi.string().description("username for email server"),
        SMTP_PASSWORD: Joi.string().description("password for email server"),
        EMAIL_FROM: Joi.string().description("the from field in the emails sent by the app"),
    })
    .unknown();

const { value: ENV_VARS, error } = envValidationSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
    throw new Error(`Env Configuration validation error: ${error.message}`);
}

export default {
    env: ENV_VARS.NODE_ENV,
    port: ENV_VARS.PORT,
    database: {
        url: ENV_VARS.MONGODB_URL,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: ENV_VARS.JWT_SECRET,
    },
    email: {
        smtp: {
            host: ENV_VARS.SMTP_HOST,
            port: ENV_VARS.SMTP_PORT,
            auth: {
                user: ENV_VARS.SMTP_USERNAME,
                pass: ENV_VARS.SMTP_PASSWORD,
            },
        },
        from: ENV_VARS.EMAIL_FROM,
    },
};
