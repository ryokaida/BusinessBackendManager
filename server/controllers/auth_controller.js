/**
 * This file contains the Auth API.
 * The Auth API incporporates the module {@link module: ./api_controller.js} for the basic API logic.
 * The Auth API also ensures that the Users-specific schemas, etc. data are used with the Users module {@link object: ../models/users_model.js} and the validateJSONFormat module {@link module:../util/validateJSONFormat.js}.
 * The user's token is created with the module {@link module:../util/secretToken.js}.
 * 
 * Source for using TestMode: https://stackoverflow.com/questions/71267005/rest-api-how-to-generate-a-500-error-status-when-using-a-postman-request
 * 
 * @module auth_controller
 * @requires module:../models/users_model.js  Creates the schema used for Users in the database
 * @requires module:../util/secretToken.js Create the user's token
 * @requires module:../util/validateJSONFormat.js Validate the incoming JSON when registering a user
 */
import { User, addUserJSONValidationSchema } from "../models/users_model.js";
import { createSecretToken } from "../util/secretToken.js";
import bcrypt from "bcryptjs";
import { logger } from "../../logger.js";
import { validateJSONFormat } from "../util/validateJSONFormat.js";

/**
 * Signup
 * Uses the expected schema from the User model (using the module {@link object: ../models/users_model.js/addUserJSONValidationSchema}) to validate the incoming JSON.
 * 
 * @function signup
 * @requires module:../models/users_model.js/addUserJSONValidationSchema - creates the schema to validate the incoming JSON body against
 * @param {Request} req The request
 * @param {Response} res The response
 * @param {NextFunction} next Move onto the next route/middleware/etc.
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const signup = async (req, res, next) =>
{
    try
    {
        /**
         * If testing the 500 error, then force a 500 error.
         */
        if ((req.body) && ("testMode" in req.body) && (req.body.testMode === true))
        {
            logger.debug("Running in Test Mode.  Forcing a 500 error in signup");
            throw("Testing 500 error in signup");
        }
        
        /**
         * Validate the format of the incoming JSON.  If it is invalid, then return an error message.
         */
        const { success, message } = validateJSONFormat(addUserJSONValidationSchema, req.body);
        if (!success)
        {
            const responseJSON = { success: false, message: "400 - Invalid JSON: " + message };
            logger.error(JSON.stringify(responseJSON));
            return res.status(400).json(responseJSON);
        }

        /**
         * Take in user data from request body.
         * If role is populated with anything other than the default role, replace the value with the default role
         */
        let { email, password, name, role } = req.body;
        if (role && role !== "guest")
        {
            role = "guest";
        }

        /**
         * Verify that the user does not already exist in the database.
         * If the user already exists, then return an error message.
         */
        const existingUser = await User.findOne({ email });
        if (existingUser)
        {
            const responseJSON = { success: false, message: "400 - User already exists!" };
            logger.error(JSON.stringify(responseJSON));
            return res.status(400).json(responseJSON);
        }

        /**
         * Create the new user in the database, create their token, and set their cookie.
         */
        const user = await User.create({ email, password, name, role });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });

        // Do NOT return response so that the cookie can be kept.
        const responseJSON = { success: true, message: "201 - User successfully signed up: " + user._id, data: user };
        logger.info(JSON.stringify(responseJSON));
        res.status(201).json(responseJSON);
        next();
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return res.status(500).json(responseJSON);
    }
};

/**
 * Login
 * 
 * @function login
 * @param {Request} req The request
 * @param {Response} res The response
 * @param {NextFunction} next Move onto the next route/middleware/etc.
 * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
 */
export const login = async (req, res, next) =>
{
    try
    {
        /**
         * If testing the 500 error, then force a 500 error.
         */
        if ((req.body) && ("testMode" in req.body) && (req.body.testMode === true))
        {
            logger.debug("Running in Test Mode.  Forcing a 500 error in signup");
            throw("Testing 500 error in signup");
        }
        
        const { email, password } = req.body;
        console.log("LOGIN: " + email + " | " + password)
        /**
         * Validate that the email and password are present.  If either is missing, then return an error message.
        */
        if (!email || !password)
        {
            const responseJSON = { success: false, message: "400 - Not all of the required fields were included!" };
            logger.error(JSON.stringify(responseJSON));
            return res.status(400).json(responseJSON);
        }

        /**
         * Check to see if the user exists in the database.  If not, then return an error message.
         */
        const user = await User.findOne({ email });
        if (!user)
        {
            const responseJSON = { success: false, message: "401 - Incorrect email or password!" };
            logger.error(JSON.stringify(responseJSON));
            return res.status(401).json(responseJSON);
        }

        /**
         * Unhash the password in the database so that the incoming password can be compared against it.
         * If they do not match, then return an error message.
         */
        const auth = await bcrypt.compare(password, user.password);
        if (!auth)
        {
            const responseJSON = { success: false, message: "401 - Incorrect email or password!" };
            logger.error(JSON.stringify(responseJSON));
            return res.status(401).json(responseJSON);
        }

        /**
         * Create the user's token, and set their cookie.
         */
        const token = createSecretToken(user._id);
        res.cookie("token", token,
            {
                withCredentials: true,
                httpOnly: false,
            }
        );

        // Do NOT return response so that the cookie can be kept.
        const responseJSON = { success: true, message: "200 - User successfully logged in: " + user._id, data: user };
        logger.info(JSON.stringify(responseJSON));
        res.status(200).json(responseJSON);
        next();
    }
    catch (error)
    {
        const responseJSON = { success: false, message: "500 - Internal Server Error: " + error };
        logger.error(JSON.stringify(responseJSON));
        return res.status(500).json(responseJSON);
    }
};

/**
 * Login
 * Source: https://www.geeksforgeeks.org/5-simple-steps-for-authentication-and-authorization-in-mern-stack/
 * 
 * @function logout
 * @param {Request} req The request
 * @param {Response} res The response
 * @returns {JSON} The result as JSON - ({ success: bool, message: string })
 */
export const logout = (req, res) => {
    const responseJSON = { success: true, message: "200 - Logged out successfully" };
    logger.info(JSON.stringify(responseJSON));
    return res.clearCookie("token").status(200).json(responseJSON);
};