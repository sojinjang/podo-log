import pino from "pino";
import pretty from "pino-pretty";
const stream = pretty({
  colorize: true,
});
export const logger = pino({ level: process.env.LOG_LEVEL || "info" }, stream);
