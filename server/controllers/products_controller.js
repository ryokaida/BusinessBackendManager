/**
 * This file contains the Products API.
 * The Products API incporporates the module {@link module:./api_controller.js} for the basic API logic.
 * The Products API also ensures that the Products-specific schemas, etc. data are used with the Products module {@link object:../models/products_model.js}.
 * 
 * @module products_controller
 * @requires module:./api_controller.js Contains the basid API logic
 * @requires module:../models/products_model.js Creates the schema used for Products in the database, provides the Products collection, and validates new/updated products
 */
import { addProductJSONValidationSchema, Product, updateProductJSONValidationSchema } from "../models/products_model.js";
import { logger } from "../../logger.js";
import { addNew, deleteOne, getAll, getOneByID, updateOne } from "./api_controller.js";

/**
 * Get all Products.
 * Passes the Product collection into the API function.
 * @function getAllProducts
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, numberOfItems: Number (only if successful), data: JSON (only if successful) })
 * 
 * You can filter for Products by using adding the filter queries to the URL.
 * @example
 * // returns the Product names Joe Smith with the role of "employee"
 * ?role=employee&name=Joe%20Smith
 */
export const getAllProducts = async (req, res, in_StrTestMode) => {
    logger.info("Getting all Products");
    return getAll(req, res, Product, in_StrTestMode);
};

/**
 * Get a Product by its ID (_id).
 * Passes the Product collection and the expected schema for the new Product into the API function.
 * @function getAProductByID
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const getAProductByID = async (req, res, in_StrTestMode) => {
    logger.info("Finding Product by ID");
    return getOneByID(req, res, Product, in_StrTestMode);
};

/**
 * Add a new Product.
 * Passes the Product collection and the expected schema (using the module {@link module:../models/products_model.js/addProductJSONValidationSchema}) for the new Product into the API function.
 * 
 * @function addNewProduct
 * @requires module:../models/products_model.js/addProductJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const addNewProduct = async (req, res, in_StrTestMode) => {
    logger.info("Adding new Product");
    return addNew(req, res, Product, addProductJSONValidationSchema, in_StrTestMode);
};

/**
 * Update a Product.
 * The Product is found by _id.
 * Passes the Product collection and the expected schema (using the module {@link module:../models/products_model.js/addProductJSONValidationSchema}) for the new Product into the API function.
 * @function updateAProduct
 * @requires module:../models/products_model.js/updateProductJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const updateAProduct = async (req, res, in_StrTestMode) => {
    logger.info("Updating Product");
    return updateOne(req, res, Product, updateProductJSONValidationSchema, in_StrTestMode);
};

/**
 * Delete a Product.
 * The Product is found by _id.
 * Passes the Product collection into the API function.
 * @function deleteAProduct
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const deleteAProduct = async (req, res, in_StrTestMode) => {
    logger.info("Deleting Product");
    return deleteOne(req, res, Product, in_StrTestMode);
};