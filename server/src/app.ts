import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { corsOption } from "./config";
import passport from "passport";
import passportConfig from "./passport";

import { errorLogger, errorHandler } from "./middlewares";
import routes from "./routes";
import "./db";

const app = express();
app.use(passport.initialize());
passportConfig();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));
app.use(cors(corsOption));

app.use("/api", routes);

// 잘못된 경로 404
// app.use((req, res, next) => next(new NotFoundError()));

app.use(errorLogger);
app.use(errorHandler);

export default app;
