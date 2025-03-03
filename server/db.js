/**
 * This file handles connecting to the MongoDB database.
 * The environment variables are loaded via the module {@link module:./loadEnvironment.mjs}.
 * 
 * @module db
 * @requires module:./loadEnvironment.mjs Script to load the environment variables
 */
import mongoose from "mongoose";
import "./loadEnvironment.mjs";
import { logger } from "../logger.js";

/**
 * Create the connection string from the .env file at the root of the project.
 * Source: https://www.mongodb.com/resources/languages/express-mongoddb-rest-api-tutorial
 */
const URI = process.env.ATLAS_URI;
const dbName = process.env.DB_NAME;

/**
 * Try to connect to the database with Mongoose.  If there is an error, stop the software.
 * @function connectDB
 * @exports connectDB Fnction to connect to the database
 */
export async function connectDB()
{
    try
    {
        logger.trace("Connecting to database");
        const db = await mongoose.connect(URI, { dbName: dbName });
        logger.info("Connected to MongoDB database: " + dbName);
    }
    catch (error)
    {
        logger.fatal("Unable to connect to database: " + error);
        process.exit(1);
    }
}