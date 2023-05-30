import "reflect-metadata";
import express from "express";
import cors from "cors";
import { corsOption } from "../config";
import passport from "passport";
import passportConfig from "../services/passport";
import { errorLogger, errorHandler } from "../api/middlewares";
import routes from "../api/routes";
import { NotFoundError } from "../core/api-error";

export default async ({ app }: { app: express.Application }) => {
  app.use(passport.initialize());
  passportConfig();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: false }));
  app.use(cors(corsOption));

  app.use("/api", routes);

  app.use((req, res, next) => next(new NotFoundError()));

  app.use(errorLogger);
  app.use(errorHandler);

  return app;
};
