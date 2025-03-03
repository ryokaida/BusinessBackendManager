/**
 * This file contains the basic functions for API actions.  The actual APIs such as the Users APIs, Advertising Queue Items APIs, etc. will call these functions for their API logic.
 * 
 * Source for using TestMode: https://stackoverflow.com/questions/71267005/rest-api-how-to-generate-a-500-error-status-when-using-a-postman-request
 * 
 * @module api_controller
 */
import { logger } from "../../logger.js";
import { validateJSONFormat } from "../util/validateJSONFormat.js";

/**
 * Get all items from the collection.
 * @function getAll
 * @param {Request} in_Req The request
 * @param {Response} io_Res The response
 * @param {Model} in_Model The collection model that is being interacted with
 * @returns {JSON} Returns io_Res - the result as JSON - ({ success: bool, message: string, numberOfItems: Number (only if successful), data: JSON (only if successful) })
*/
export const getAll = async (in_Req, io_Res, in_Model) => {
    try
    {
        /**
         * If testing the 500 error, then force a 500 error.
         */
        if ((in_Req.body) && ("testMode" in in_Req.body) && (in_Req.body.testMode === true))
        {
            logger.debug("Running in Test Mode.  Forcing a 500 error in getAll");
            throw("Testing 500 error in getAll");
        }

        /**
         * Ensure that the items can be filtered if needed.
         * Sources:
         * https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
         * https://www.geeksforgeeks.org/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/
         * @todo Expand filters to filter more than just string equality
         */
        let data = await in_Model.find();
        if (in_Req.query)
        {
            const filters = in_Req.query;
            data = data.filter
            (
                item =>
                {
                    let isValid = true;
                    for (let key in filters)
                    {   
                        logger.trace(key, item[key], filters[key]);
                        isValid = isValid && item[key] === filters[key];
                    }
                    return isValid;
                }
            );
        }
        /**
         * Also, print/return number of items found.
         * Source: https://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
         */
        const responseJSON = { success: true, message: "200 - Successfully retrieved all items", numberOfItems: Object.keys(data).length, data: data };
        /**
         * Also, clone responseJSON, and remove "data" from the JSON when printing the log message so that the logs don't get clogged up
         * Sources:
         * https://www.geeksforgeeks.org/how-to-remove-element-from-json-object-in-javascript/
         * https://www.freecodecamp.org/news/clone-an-object-in-javascript/
         */
        const loggerJSON = { ...responseJSON };
        delete loggerJSON.data;
        logger.info(JSON.stringify(loggerJSON));
        return io_Res.status(200).json(responseJSON);
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return io_Res.status(500).json(responseJSON);
    }
};

/**
 * Get one item from the collection based on _id.
 * @function getOneByID
 * @param {Request} in_Req The request
 * @param {Response} io_Res The response
 * @param {Model} in_Model The collection model that is being interacted with
 * @returns {JSON} Returns io_Res - the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
*/
export const getOneByID = async (in_Req, io_Res, in_Model) => {
    try
    {
        /**
         * If testing the 500 error, then force a 500 error.
         */
        if ((in_Req.body) && ("testMode" in in_Req.body) && (in_Req.body.testMode === true))
        {
            logger.debug("Running in Test Mode.  Forcing a 500 error in getOneByID");
            throw("Testing 500 error in getOneByID");
        }

        const data = await in_Model.findById(in_Req.params.id);

        /**
         * If the data is not found, then return an error message.
         */
        if (!data)
        {
            logger.error("404: Not found!");
            return io_Res.status(404).json({ success: false, message: "404 - Not found!" });
        }
        
        const responseJSON = { success: true, message: "200 - Successfully retrieved item by ID: " + data._id, data: data };
        logger.info(JSON.stringify(responseJSON));
        return io_Res.status(200).json(responseJSON);
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return io_Res.status(500).json(responseJSON);
    }
};

/**
 * Add a new item to the collection.
 * @function addNew
 * @requires module:../util/validateJSONFormat.js Ised to validate the format of the incoming updating item (as JSON)
 * @param {Request} in_Req The request
 * @param {Response} io_Res The response et all items
 * @param {Model} in_Model The collection model that is being interacted with
 * @param {Joi.Object} in_JSONValidationSchema The schema to validate the incoming JSON against
 * @returns {JSON} Returns io_Res - the result as JSON - ({ success: bool, message: string, data: JSON (only if successful)  })
*/
export const addNew = async (in_Req, io_Res, in_Model, in_JSONValidationSchema) => {
    try
    {
        const data = new in_Model(in_Req.body);

        /**
         * Validate the format of the incoming JSON.  If it is invalid, then return an error message.
         */
        const { success, message } = validateJSONFormat(in_JSONValidationSchema, in_Req.body);
        if (!success)
        {
            const responseJSON = { success: false, message: "400 - Invalid JSON: " + message };
            logger.error(JSON.stringify(responseJSON));
            return io_Res.status(400).json(responseJSON);
        }
        
        await data.save();
        const responseJSON = { success: true, message: "201 - Successfully added item: " + data._id, data: data };
        logger.info(JSON.stringify(responseJSON));
        return io_Res.status(201).json(responseJSON);
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return io_Res.status(500).json(responseJSON);
    }
};

/**
 * Update one item from the collection based on _id.  Will show the updated item in the "data" of the output.
 * @function updateOne
 * @requires module:../util/validateJSONFormat.js Used to validate the format of the incoming updating item (as JSON)
 * @param {Request} in_Req The request
 * @param {Response} io_Res The response
 * @param {Model} in_Model The collection model that is being interacted with
 * @param {Joi.Object} in_JSONValidationSchema The schema to validate the incoming JSON against 
 * @returns {JSON} Returns io_Res - the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
*/
export const updateOne = async (in_Req, io_Res, in_Model, in_JSONValidationSchema) => {
    try
    {
        /**
         * If testing the 500 error, then force a 500 error.
         */
        if ((in_Req.body) && ("testMode" in in_Req.body) && (in_Req.body.testMode === true))
        {
            logger.debug("Running in Test Mode.  Forcing a 500 error in updateOne");
            throw("Testing 500 error in updateOne");
        }

        /**
         * Validate the format of the incoming JSON.  If it is invalid, then return an error message.
         */
        const { success, message } = validateJSONFormat(in_JSONValidationSchema, in_Req.body);
        if (!success)
        {
            const responseJSON = { success: false, message: "400 - Invalid JSON: " + message};
            logger.error(JSON.stringify(responseJSON));
            return io_Res.status(400).json(responseJSON);
        }
        
        /**
         * Update an item by _id.
         * Sources:
         * https://www.geeksforgeeks.org/mongoose-findbyidandupdate-function/
         * https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
         * Show the updated user in the output.
         */
        const data = await in_Model.findByIdAndUpdate(in_Req.params.id, in_Req.body, {new: true});

        /**
         * If the data is not found, then return an error message.
         */
        if (!data)
        {
            const responseJSON = { success: false, message: "404 - Not found!" };
            logger.error(JSON.stringify(responseJSON));
            return io_Res.status(404).json(responseJSON);
        }
        
        const responseJSON = { success: true, message: "200 - Successfully updated item: " + data._id, data: data };
        logger.info(JSON.stringify(responseJSON));
        return io_Res.status(200).json(responseJSON);
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return io_Res.status(500).json(responseJSON);
    }
};

/**
 * Delete one item from the collection based on _id.
 * @function deleteOne
 * @param {Request} in_Req The request
 * @param {Response} io_Res The response
 * @param {Model} in_Model The collection model that is being interacted with
 * @returns {JSON} Returns io_Res - the result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
*/
export const deleteOne = async (in_Req, io_Res, in_Model) => {
    try
    {
        /**
         * If testing the 500 error, then force a 500 error.
         */
        if ((in_Req.body) && ("testMode" in in_Req.body) && (in_Req.body.testMode === true))
        {
            logger.debug("Running in Test Mode.  Forcing a 500 error in deleteOne");
            throw("Testing 500 error in deleteOne");
        }
        
        /**
         * Delete an item by _id.
         * Source: Module 3 reading
         */
        const data = await in_Model.findByIdAndDelete(in_Req.params.id);

        /**
         * If the data is not found, then return an error message.
         */
        if (!data)
        {
            const responseJSON = { success: false, message: "404 - Not found!" };
            logger.error(JSON.stringify(responseJSON));
            return io_Res.status(404).json(responseJSON);
        }
        
        const responseJSON = { success: true, message: "200 - Successfully deleted item: " + data._id };
        logger.info(JSON.stringify(responseJSON));
        return io_Res.status(200).json(responseJSON);
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return io_Res.status(500).json(responseJSON);
    }
};