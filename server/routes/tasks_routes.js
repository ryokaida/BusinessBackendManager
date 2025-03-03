/**
 * This file contains the routes to use the Tasks API.  The Tasks API is called from module {@link module:../controllers/tasks_controller.js}.
 * 
 * Source for schema validation: https://joi.dev/api/?v=17.13.3
 * Source for validating that the incoming role is in the list of allowed roles via JOI: https://stackoverflow.com/questions/41408469/nodejs-joi-check-if-string-is-in-a-given-list
 * 
 * @module Tasks_routes
 * @requires module:../controllers/tasks_controller.js The Tasks APIs
 */
import express from "express";
import { getAllTasks, addNewTask, deleteATask, getATaskByID, updateATask } from "../controllers/tasks_controller.js";

/** Create a router that will allow other files to use the API routes */
const TaskRouter = express.Router();

/** Establish the routes for the APIs */
TaskRouter.get("/", getAllTasks);
TaskRouter.get("/:id", getATaskByID);
TaskRouter.post("/", addNewTask);
TaskRouter.put("/:id", updateATask);
TaskRouter.delete("/:id", deleteATask);

/**
 * @exports TaskRouter The exported router to to allow other files to use the API routes
 */
export default TaskRouter;