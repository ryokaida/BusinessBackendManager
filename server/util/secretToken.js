/**
 * This file contains the function that generates a token for the user.
 * This file loads the environment variable using module {@link module:../loadEnvironment.mjs}.
 * 
 * Source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 * 
 * @module secretToken
 * @requires module:../loadEnvironment.mjs Script to load the Environment Variables
 */
import "../loadEnvironment.mjs";
import jwt from "jsonwebtoken";

/**
 * Generate a token for the user.
 * @function
 * @param {string} id The user's ID
 * @returns {Token} Returns the token for the user
 */
export const createSecretToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60
    });
}