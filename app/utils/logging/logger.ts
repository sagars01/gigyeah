// logger.ts
import winston, { format, Logger } from 'winston';

const { combine, timestamp, printf } = format;

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    FATAL = 'fatal'
}

const customFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level}]: ${message}`;
});

const logger: Logger = winston.createLogger({
    level: (process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG) as LogLevel,
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;