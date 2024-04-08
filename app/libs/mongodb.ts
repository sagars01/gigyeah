import mongoose from 'mongoose';
import logger, { LogLevel } from '../utils/logging/logger';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

interface IMongoGlobal {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: IMongoGlobal;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        logger.log(LogLevel.INFO, "Cached Mongo Connection Used")
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            dbName: 'main'
        };
        logger.log(LogLevel.INFO, "Mongoose Connection initiated..")
        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            logger.log(LogLevel.INFO, "Mongoose Connection Successful")
            return mongoose;
        }).catch((e) => {
            logger.log(LogLevel.ERROR, "Mongoose Connection Error: " + e)
            return e
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
