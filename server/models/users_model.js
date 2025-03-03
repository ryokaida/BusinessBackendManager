/**
 * This file contains model for Users in the database and the expected schemas when adding/updating Users.
 * 
 * Source for schema validation: https://joi.dev/api/?v=17.13.3
 * Source for validating that the incoming role is in the list of allowed roles via Joi: https://stackoverflow.com/questions/41408469/nodejs-joi-check-if-string-is-in-a-given-list
 * Source for hashing password, field is required message setup, and signup/login logic: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 * 
 * @module users_model
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";

/**
 * Make schema for the User collection and assign it to a variable (will include created and updated timestamps).
 * 
 * Ensure that user-inputted strings are trimmed.
 * 
 * Sources:
 * https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express
 * https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose
 * 
 * @namespace userSchema
 * @property {string} email The User's email; required; must be unique
 * @property {string} name The User's name; required
 * @property {string} password The User's hashed password; required
 * @property {string} role The User's role (guest, employee, or owner); required; the Default value is "guest"
 * @property {boolean} [testMode] This is only used when testing the APIs; if this is TRUE, then a 500 error will be artificially created
 */
const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true
        },
        /**
         * Prevent the password from showing up in queries.
         * Source: https://www.geeksforgeeks.org/how-to-protect-the-password-field-in-mongoose-mongodb/
         */
        password:
        {
            type: String,
            required: [true, "Password is required"],
            //select: false,
            trim: true
        },
        name:
        {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        role:
        {
            type: String,
            required: [true, "Role is required"],
            /**
             * Only allow the listed roles.
             * Source: https://stackoverflow.com/questions/57676596/how-to-allow-only-certain-string-values-inside-a-mongodb-array-using-mongoose
             */
            enum: ["owner", "employee", "guest"],
            /**
             * Set "guest" role as the default.
             * Source: https://mongoosejs.com/docs/defaults.html
             */
            default: "guest"
        },
        testMode: Boolean
    },
    {
        timestamps: true
    }
);

/**
 * Hash the password for security.
 */
userSchema.pre("save", async function ()
    {
        this.password = await bcrypt.hash(this.password, 12);
    }
);

/**
 * Create User model.
 * @exports User The User model
 */
export const User = mongoose.model("user", userSchema);


/**
 * Establish the expected schema for the JSON body when adding new Users.
 * 
 * @namespace addUserJSONValidationSchema
 * @property {Joi.string} email The User's email; required
 * @property {Joi.string} name The User's name; required
 * @property {Joi.string} password The User's hashed password; required
 * @property {Joi.string} role The User's role (guest, employee, or owner); required; the Default value is "guest"
 * @property {Joi.boolean} [testMode] This is only used when testing the APIs; if this is TRUE, then a 500 error will be artificially created
 * @exports addUserJSONValidationSchema Function to create the expected schema for the JSON body when adding new Users
 */
export const addUserJSONValidationSchema = Joi.object
(
    {
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        name: Joi.string().required(),
        password: Joi.string().required(),
        /** Validate that the incoming role is in the list of valid roles. */
        role: Joi.string().valid("owner", "employee", "guest"),
        testMode: Joi.boolean()
    }
);

/**
 * Establish the expected schema for the JSON body when updating Users.
 * 
 * @namespace updateUserJSONValidationSchema
 * @property {Joi.string} email The User's email; not required
 * @property {Joi.string} name The User's name; not required
 * @property {Joi.string} password The User's hashed password; not required
 * @property {Joi.string} role The User's role (guest, employee, or owner); not required; the Default value is "guest"
 * @exports updateUserJSONValidationSchema Function to create the expected schema for the JSON body when updating new Users
 */
export const updateUserJSONValidationSchema = Joi.object
(
    {
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        name: Joi.string(),
        password: Joi.string(),
        /** Validate that the incoming role is in the list of valid roles. */
        role: Joi.string().valid("owner", "employee", "guest")
    }
);