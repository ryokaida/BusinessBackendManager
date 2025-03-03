/**
 * This file contains model for Tasks in the database and the expected schemas when adding/updating Tasks.
 * 
 * Source for schema validation: https://joi.dev/api/?v=17.13.3
 * Source for validating that the incoming role is in the list of allowed roles via Joi: https://stackoverflow.com/questions/41408469/nodejs-joi-check-if-string-is-in-a-given-list
 * Source for hashing password, field is required message setup, and signup/login logic: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 * 
 * @module Tasks_model
 */

import mongoose from "mongoose";
import Joi from "joi";

/**
 * Make schema for the Task collection and assign it to a variable (will include created and updated timestamps).
 * 
 * Ensure that Task-inputted strings are trimmed.
 * 
 * Sources:
 * https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express
 * https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose
 * 
 * @namespace TaskSchema
 * @property {string} product The name of the product being shipped; required
 * @property {string} employee The email of the employee shipping the product; required
 * @property {string} completed Whether the product was shipped or not (yes or no); the Default value is "no"
 * @property {boolean} [testMode] This is only used when testing the APIs; if this is TRUE, then a 500 error will be artificially created
 */
const TaskSchema = new mongoose.Schema(
    {
        product:
        {
            type: String,
            required: [true, "Product is required"],
            trim: true
        },
        employee:
        {
            type: String,
            required: [true, "Employee is required"],
            trim: true
        },
        completed:
        {
            type: String,
            /**
             * Set "no" as the default.
             * Source: https://mongoosejs.com/docs/defaults.html
             */
            default: "no"
        },
        testMode: Boolean
    },
    {
        timestamps: true
    }
);

/**
 * Create Task model.
 * @exports Task The Task model
 */
export const Task = mongoose.model("Task", TaskSchema);


/**
 * Establish the expected schema for the JSON body when adding new Tasks.
 * 
 * @namespace addTaskJSONValidationSchema
 * @property {Joi.string} product The name of the product being shipped; required
 * @property {Joi.string} employee The email of the employee shipping the product; required
 * @property {Joi.string} completed Whether the product was shipped or not (yes or no); the Default value is "no"
 * @property {Joi.boolean} [testMode] This is only used when testing the APIs; if this is TRUE, then a 500 error will be artificially created
 * @exports addTaskJSONValidationSchema Function to create the expected schema for the JSON body when adding new Tasks
 */
export const addTaskJSONValidationSchema = Joi.object
(
    {
        product: Joi.string().required(),
        employee: Joi.string().required(),
        completed: Joi.string().valid("yes", "no"),
        testMode: Joi.boolean()
    }
);

/**
 * Establish the expected schema for the JSON body when updating Tasks.
 * 
 * @namespace updateTaskJSONValidationSchema
 * @property {Joi.string} product The name of the product being shipped; not required
 * @property {Joi.string} employee The email of the employee shipping the product; not required
 * @property {Joi.string} completed Whether the product was shipped or not (yes or no); not required; the Default value is "no"
 * @exports updateTaskJSONValidationSchema Function to create the expected schema for the JSON body when updating new Tasks
 */
export const updateTaskJSONValidationSchema = Joi.object
(
    {
        product: Joi.string(),
        employee: Joi.string(),
        completed: Joi.string().valid("yes", "no")
    }
);