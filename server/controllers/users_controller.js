/**
 * This file contains the Users API.
 * The Users API incporporates the module {@link module:./api_controller.js} for the basic API logic.
 * The Users API also ensures that the Users-specific schemas, etc. data are used with the Users module {@link object:../models/users_model.js}.
 * 
 * @module users_controller
 * @requires module:./api_controller.js Contains the basid API logic
 * @requires module:../models/users_model.js Creates the schema used for Users in the database, provides the Users collection, and validates new/updated users
 */
import { User, addUserJSONValidationSchema, updateUserJSONValidationSchema } from "../models/users_model.js";
import { logger } from "../../logger.js";
import { addNew, deleteOne, getAll, getOneByID, updateOne } from "./api_controller.js";

/**
 * Get all users.
 * Passes the User collection into the API function.
 * @function getAllUsers
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, numberOfItems: Number (only if successful), data: JSON (only if successful) })
 * 
 * You can filter for users by using adding the filter queries to the URL.
 * @example
 * // returns the User names Joe Smith with the role of "employee"
 * ?role=employee&name=Joe%20Smith
 */
export const getAllUsers = async (req, res, in_StrTestMode) => {
    logger.info("Getting all users");
    return getAll(req, res, User, in_StrTestMode);
};

/**
 * Get a User by its ID (_id).
 * Passes the User collection and the expected schema for the new user into the API function.
 * @function getAUserByID
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const getAUserByID = async (req, res, in_StrTestMode) => {
    logger.info("Finding user by ID");
    return getOneByID(req, res, User, in_StrTestMode);
};

/**
 * Add a new user.
 * Passes the User collection and the expected schema (using the module {@link module:../models/users_model.js/addUserJSONValidationSchema}) for the new user into the API function.
 * 
 * @function addNewUser
 * @requires module:../models/users_model.js/addUserJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const addNewUser = async (req, res, in_StrTestMode) => {
    logger.info("Adding new user");
    return addNew(req, res, User, addUserJSONValidationSchema, in_StrTestMode);
};

/**
 * Update a user.
 * The User is found by _id.
 * Passes the User collection and the expected schema (using the module {@link module:../models/users_model.js/addUserJSONValidationSchema}) for the new user into the API function.
 * @function updateAUser
 * @requires module:../models/users_model.js/updateUserJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const updateAUser = async (req, res, in_StrTestMode) => {
    logger.info("Updating user");
    return updateOne(req, res, User, updateUserJSONValidationSchema, in_StrTestMode);
};

/**
 * Delete a user.
 * The User is found by _id.
 * Passes the User collection into the API function.
 * @function deleteAUser
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const deleteAUser = async (req, res, in_StrTestMode) => {
    logger.info("Deleting user");
    return deleteOne(req, res, User, in_StrTestMode);
};