/**
 * This file contains a helper function to validate the incoming JSON against the provided schema when adding/updating items.
 * 
 * @module validateJSONFormat
 */

import { logger } from "../../logger.js";

/**
 * Validate the incoming JSON format.
 * @param {Joi.Object} in_Schema - the schema to validate the JSON against
 * @param {JSON} in_InputJSON - the incoming JSON to validate
 * @returns {JSON} - returns the result as JSON - ({ success, message })
*/
export function validateJSONFormat(in_Schema, in_InputJSON)
{   try
    {
        logger.trace("Validating JSON format");
        const { error, value } = in_Schema.validate(in_InputJSON);

        /**
         * If there is no error from JOI, continue.  Otherwise, throw an return an error message.
         */
        if (error === undefined)
        {
            // convert output to JSON String
            logger.trace("JSON Format is valid: " + JSON.stringify(value));
            return { success: true, message: "JSON Format is valid: " + JSON.stringify(value) };
        }
        else
        {
            logger.error("JSON Format is invalid: " + error);
            return { success: false, message: "JSON Format is invalid: " + error };
        }
    }
    catch (error)
    {
        logger.error("Unexpected error while validating JSON Format: " + error);
        return { success: false, message: "Unexpected error while validating JSON Format: " + error };        
    }
}