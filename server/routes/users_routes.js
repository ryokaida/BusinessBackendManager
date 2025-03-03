/**
 * This file contains the routes to use the Users API.  The Users API is called from module {@link module:../controllers/users_controller.js}.
 * 
 * Source for schema validation: https://joi.dev/api/?v=17.13.3
 * Source for validating that the incoming role is in the list of allowed roles via JOI: https://stackoverflow.com/questions/41408469/nodejs-joi-check-if-string-is-in-a-given-list
 * 
 * @module users_routes
 * @requires module:../controllers/users_controller.js The Users APIs
 */
import express from "express";
import { getAllUsers, addNewUser, deleteAUser, getAUserByID, updateAUser } from "../controllers/users_controller.js";

/** Create a router that will allow other files to use the API routes */
const userRouter = express.Router();

/** Establish the routes for the APIs */
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getAUserByID);
userRouter.post("/", addNewUser);
userRouter.put("/:id", updateAUser);
userRouter.delete("/:id", deleteAUser);

/**
 * @exports userRouter The exported router to to allow other files to use the API routes
 */
export default userRouter;