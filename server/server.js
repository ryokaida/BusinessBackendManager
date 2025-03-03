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
 * Set up dirname for deployment.
 * Source: https://youtu.be/O3BUHwfHf84?si=xXxU_GtkHSrkPldO
*/
const __dirname = path.resolve();

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

/**
 * Setting app up for deployment.
 * Serve index.html and use app under 1 port.
 * Source: https://youtu.be/O3BUHwfHf84?si=xXxU_GtkHSrkPldO
 */
if (process.env.NODE_ENV === "Prod")
    {
        /** Serve up /client/dist folder as static asset. */
        app.use(express.static(path.join(__dirname, "/client/dist")));
        /** If using any route other than the above routes, then return the index.html file (react app). */
        app.get
        (
            "*", (req, res) =>
            {
                res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
            }
        );
    }

/** Start server, and connect to the MongoDB database. */
app.listen(PORT, () =>
    {
        connectDB();
        logger.info("Server is running on port: " + PORT);
    }
);