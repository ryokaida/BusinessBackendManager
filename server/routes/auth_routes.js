/**
 * This file contains the routes to use the Auth API.
 * The signup. login, and logout APIs are called from module {@link module:../controllers/auth_controller.js}.
 * The logic to verify that the user's session has been set is called from module {@link module:../middwares/auth_middleware.js}.
 * 
 * Source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 * 
 * @module auth_routes
 * @requires module:../controllers/auth_controller.js The signup, login, and logout APIs
 * @requires module:../middlewares/auth_middleware.js The logic to verify that the user's session has been set
 */
import express from "express";
import { login, logout, signup } from "../controllers/auth_controller.js";
import { userVerification } from "../middlewares/auth_middleware.js";

/** Create a router that will allow other files to use the API routes */
const authRouter = express.Router();

/** Establish the routes for the APIs */
authRouter.post("/", userVerification);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout)

/**
 * @exports authRouter The exported router to to allow other files to use the API routes
 */
export default authRouter;