/**
 * This file contains the Tasks API.
 * The Tasks API incporporates the module {@link module:./api_controller.js} for the basic API logic.
 * The Tasks API also ensures that the Tasks-specific schemas, etc. data are used with the Tasks module {@link object:../models/tasks_model.js}.
 * 
 * @module Tasks_controller
 * @requires module:./api_controller.js Contains the basid API logic
 * @requires module:../models/tasks_model.js Creates the schema used for Tasks in the database, provides the Tasks collection, and validates new/updated Tasks
 */
import { Task, addTaskJSONValidationSchema, updateTaskJSONValidationSchema } from "../models/tasks_model.js";
import { logger } from "../../logger.js";
import { addNew, deleteOne, getAll, getOneByID, updateOne } from "./api_controller.js";

/**
 * Get all Tasks.
 * Passes the Task collection into the API function.
 * @function getAllTasks
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, numberOfItems: Number (only if successful), data: JSON (only if successful) })
 * 
 * You can filter for Tasks by using adding the filter queries to the URL.
 * @example
 * // returns the Task where completed is "yes"
 * ?completed=yes
 */
export const getAllTasks = async (req, res, in_StrTestMode) => {
    logger.info("Getting all Tasks");
    return getAll(req, res, Task, in_StrTestMode);
};

/**
 * Get a Task by its ID (_id).
 * Passes the Task collection and the expected schema for the new Task into the API function.
 * @function getATaskByID
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const getATaskByID = async (req, res, in_StrTestMode) => {
    logger.info("Finding Task by ID");
    return getOneByID(req, res, Task, in_StrTestMode);
};

/**
 * Add a new Task.
 * Passes the Task collection and the expected schema (using the module {@link module:../models/Tasks_model.js/addTaskJSONValidationSchema}) for the new Task into the API function.
 * 
 * @function addNewTask
 * @requires module:../models/Tasks_model.js/addTaskJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const addNewTask = async (req, res, in_StrTestMode) => {
    logger.info("Adding new Task");
    return addNew(req, res, Task, addTaskJSONValidationSchema, in_StrTestMode);
};

/**
 * Update a Task.
 * The Task is found by _id.
 * Passes the Task collection and the expected schema (using the module {@link module:../models/Tasks_model.js/addTaskJSONValidationSchema}) for the new Task into the API function.
 * @function updateATask
 * @requires module:../models/Tasks_model.js/updateTaskJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const updateATask = async (req, res, in_StrTestMode) => {
    logger.info("Updating Task");
    return updateOne(req, res, Task, updateTaskJSONValidationSchema, in_StrTestMode);
};

/**
 * Delete a Task.
 * The Task is found by _id.
 * Passes the Task collection into the API function.
 * @function deleteATask
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const deleteATask = async (req, res, in_StrTestMode) => {
    logger.info("Deleting Task");
    return deleteOne(req, res, Task, in_StrTestMode);
};