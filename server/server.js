import express from "express";
import { connectDB } from "./db.js";
import url, { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { logger } from "../logger.js";
/**
 * Import body-parser for query filtering.
 * Source: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
 */
import bodyParser from "body-parser";
/**
 * Import packages for security/session management.
 * Source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 */
import cors from "cors";
import cookieParser from "cookie-parser";
/** Import API routes. */
import userRoutes from "./routes/users_routes.js";
import productRoutes from "./routes/products_routes.js";
import authRoutes from "./routes/auth_routes.js";
import tasksRoutes from "./routes/tasks_routes.js";

/** Set up dirname and filename. */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** Instantiate server. */
const app = express();
const PORT = process.env.PORT || 5000;

/** Use logger. */
app.use((req, res, next) => 
    {
        logger.info(`${req.method} ${req.url}`);
        next();
    }
);

/**
 * Allow the frontend to access resources from the server, and enable parsing cookies from the URL.
 * Source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 */
logger.trace("Enabling CORS");
app.use(cors
    (
        {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        }
    )
);
logger.trace("Enabling cookie parser");
/**
 * Ensure that the user's sesssion has been set before accessing pages.
 * Source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 */
app.use(cookieParser());

/** Use JSON for the API so that the body can be pulled from the request in the API calls. */
logger.trace("Enabling JSON");
app.use(express.json());
/**
 * Use body-parser for query filtering.
 * Source: https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
 */
logger.trace("Enabling body-parser");
app.use(bodyParser.json());

/** Use the API routes and set up the given path as the root, so the routes file only needs to have "/" as the filepath. */
app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/tasks", tasksRoutes);

/** Start server, and connect to the MongoDB database. */
app.listen(PORT, () =>
    {
        connectDB();
        logger.info("Server is running on port: " + PORT);
    }
);