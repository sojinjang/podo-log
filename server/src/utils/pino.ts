import pino from "pino";
import pretty from "pino-pretty";
import { logLevel } from "../config";

const stream = pretty({ colorize: true });

export const logger = pino({ level: logLevel }, stream);
