export const environment = process.env.NODE_ENV as string;
export const port = process.env.PORT;

export const corsOption = { origin: process.env.CORS_URL, optionsSuccessStatus: 200 };

export const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

export const logLevel = process.env.LOG_LEVEL;
