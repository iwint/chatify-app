//@ts-ignore
const config =
    process.env.NODE_ENV != "production" ? await import("dotenv") : null;

if (config) config.config();

export const PORT = process.env.PORT || 5000;
