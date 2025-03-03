/*
    sources:
    Module 5 reading
    https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
    https://github.com/winstonjs/winston/issues/1575
*/
import winston from "winston";
import "./server/loadEnvironment.mjs";

// create custom log levels system
const logLevels =
{
    fatal: 0,
    error: 1,
    warn: 2, 
    info: 3,
    debug: 4,
    trace: 5
};

// create logger
export const logger = winston.createLogger(
    {
        levels: logLevels,
        level: process.env.LOG_LEVEL || "info",
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        transports:
        [
            new winston.transports.Console()
        ]
    }
);