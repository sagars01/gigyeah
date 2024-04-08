// errorHandler.ts
import logger, { LogLevel } from './logger';

export class ErrorHandler extends Error {
    status: number;
    data?: any;
    statusText?: string;

    constructor(status: number, message: string, data?: any, statusText?: string) {
        super(message);
        this.name = 'ErrorHandler';
        this.status = status;
        this.data = data;
        this.statusText = statusText;
    }
}

export const handleError = (err: Error) => {
    let status: number, message: string, data: any, statusText: string;

    if (err instanceof ErrorHandler) {
        status = err.status;
        message = err.message;
        data = err.data;
        statusText = err.statusText || 'Internal Server Error'
    } else {
        status = 500;
        message = 'Internal Server Error';
        data = null;
        statusText = "Internal Server Error"
        logger.log(LogLevel.ERROR, 'Uncaught error:', err);
    }

    return { status, message, data, statusText };
};