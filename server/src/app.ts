import loaders from "./loaders";
import express from "express";

export default async function startLoaders() {
  const app = express();

  await loaders({ expressApp: app });
  return app;
}
