/**
 * This file contains the Auth Middleware that verifies whether the user is authorized or not.
 * This file loads the environment variable using module {@link module:../loadEnvironment.mjs}.
 * Uses the module {@link module:../models/users_model.js} to when validating the user's authorization.
 * 
 * @module auth_middleware
 * @requires module:../loadEnvironment.mjs Loads the environment variables
 * @requires module:../models/users_model.js  Provides the Users collection
 */
import { User } from "../models/users_model.js";
import "../loadEnvironment.mjs";
import jwt from "jsonwebtoken";
import { logger } from "../../logger.js";

/**
 * Validate the token to determine if the user is authorized or not.
 * 
 * @function userVerification
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} Returns the result as JSON - ({ success: bool, message: string, user: string (only if successful) })
 */
export const userVerification = (req, res) =>
{
    const token = req.cookies.token;

    /** If the token doesn't exist, then return an error message. */
    if (!token)
    {
        const responseJSON = { success: false, message: "401 - Not authorized!" };
        logger.error(JSON.stringify(responseJSON));
        return res.status(401).json(responseJSON);
    }

    /** Verify the token to determine if the user is authorized. */
    jwt.verify(token, process.env.TOKEN_KEY, async (error, data) =>
        {
            if (error)
            {
                /** If there is an error validating the token, then return an error message. */
                const responseJSON = { success: false, message: "500 - Error with validating the token: " + error };
                logger.error(JSON.stringify(responseJSON));
                return res.status(500).json(responseJSON);
            }
            else
            {
                /** Attempt to find the user in the data base if the token is validated. */
                const user = await User.findById(data.id);
                if (user)
                {
                    const responseJSON = { success: true, message: "200 - User is authorized", user: user.name };
                    logger.error(JSON.stringify(responseJSON));
                    return res.status(200).json(responseJSON);
                }
                else
                {
                    /** If the user is not found in the database, then return an error message. */
                    const responseJSON = { success: false, message: "401 - User not found when validating token!" };
                    logger.error(JSON.stringify(responseJSON));
                    return res.status(401).json(responseJSON);
                }
            }
        }
    );
};