import express, { Express, NextFunction, Request, Response } from "express";

const app: Express = express();
app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("welcome!");
});
export { app };
