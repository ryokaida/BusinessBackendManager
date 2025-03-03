/**
 * This file contains model for Products in the database and the expected schemas when adding/updating Products.
 * 
 * Source for schema validation: https://joi.dev/api/?v=17.13.3
 * Source for using JOI to validate arrays: https://stackoverflow.com/questions/42656549/joi-validation-of-array
 * 
 * @module users_model
 */
import mongoose from "mongoose";
import Joi from "joi";

/**
 * Make schema for the Product collection and assign it to a variable (will include created and updated timestamps).
 * 
 * Ensure that user-inputted strings are trimmed.
 * 
 * Sources:
 * https://www.bacancytechnology.com/blog/joi-validation-in-nodejs-and-express
 * https://stackoverflow.com/questions/20766360/whats-the-meaning-of-trim-when-use-in-mongoose
 * https://stackoverflow.com/questions/35509611/mongoose-save-array-of-strings
 * 
 * @namespace productSchema
 * @property {String} name The Product's name; required; must be unique
 * @property {String} description The Product's description; required
 * @property {[String]} tags The tags to use when advertising the Product; required
 * @property {Date} dateAdded The date the Product was added; the Default value is set to the current date when adding the Product; unable to be edited
 * @property {Number} price The Product's price; required; can't be below 0.00
 * @property {Number} qtyInStock The quantity of the Product to sell; required; can't be below 0
 * @property {String} image The link to the image in the S3 Bucket; required
 * @property {[String]} advertisingPlatforms The social media platformst to advertise the product on; required
 * @property {Date} publishDate The date the Product is posted to the social media platform(s); updated by the application
 * @property {Date} listedDate The date the Product is listed in the store; updated by the application
 * @property {String} inStore Thether the product is in the store or not; "yes" or "no"
 * @property {boolean} [testMode] This is only used when testing the APIs; if this is TRUE, then a 500 error will be artificially created
 */
const productsSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: [true, "Name is required"],
            unique: true,
            trim: true
        },
        description:
        {
            type: String,
            required: [true, "Description is required"],
            trim: true
        },
        tags:
        [{
                type: String,
                required: [true, "Tags are required"],
                trim: true
        }],
        price:
        {
            type: Number,
            required: [true, "Price is required"],
            trim: true,
            /**
             * Ensure that price is greater than 0.00
             * Source: https://mongoosejs.com/docs/schematypes.html
             */
            min: 0.00

        },
        qtyInStock:
        {
            type: Number,
            required: [true, "Quantity in Stock is required"],
            trim: true,
            /**
             * Ensure that quantity is greater than 0
             * Source: https://mongoosejs.com/docs/schematypes.html
             */
            min: 0
        },
        image:
        {
            type: String,
            required: [true, "Image is required"],
            trim: true
        },
        advertisingPlatforms:
        [{
            type: String,
            required: [true, "Advertising Platforms are required"],
            trim: true
        }],
        inStore:
        {
            type: String,
            /**
             * Set "yes" as the default.
             * Source: https://mongoosejs.com/docs/defaults.html
             */
            default: "yes"
        },
        testMode: Boolean
    },
    {
        timestamps: true
    }
);

/**
 * Create Product model.
 * @exports Product The Product model
 */
export const Product = mongoose.model("product", productsSchema);

/**
 * Establish the expected schema for the JSON body when adding new Products.
 * 
 * @namespace addProductJSONValidationSchema
 * @property {Joi.string} name The Product's name; required
 * @property {Joi.string} description The Product's description; required
 * @property {[Joi.string]} tags The tags to use when advertising the Product; required
 * @property {Joi.number} price The Product's price; required; can't be below 0.00
 * @property {Joi.number} qtyInStock The quantity of the Product to sell; required; can't be below 0
 * @property {Joi.string} image The link to the image in the S3 Bucket; required
 * @property {[Joi.string]} advertisingPlatforms The social media platformst to advertise the product on; required
 * @property {Joi.string} inStore Whether the product is listed in the store or not (yes or no); the default value is "yes"
 * @property {Joi.boolean} [testMode] This is only used when testing the APIs; if this is TRUE, then a 500 error will be artificially created
 * @exports addProductJSONValidationSchema Function to create the expected schema for the JSON body when adding new Users
 */
export const addProductJSONValidationSchema = Joi.object
(
    {
        name: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().required(),
        price: Joi.number().min(0.00).required(),
        qtyInStock: Joi.number().integer().min(0).required(),
        image: Joi.string().required(),
        advertisingPlatforms: Joi.array().required(),
        inStore: Joi.string().valid("yes", "no"),
        testMode: Joi.boolean(),
    }
);

/**
 * Establish the expected schema for the JSON body when updating Users.
 * 
 * @namespace updateProductJSONValidationSchema
 * @property {Joi.string} name The Product's name
 * @property {Joi.string} description The Product's description
 * @property {[Joi.string]} tags The tags to use when advertising the Product
 * @property {Joi.number} price The Product's price; can't be below 0.00
 * @property {Joi.number} qtyInStock The quantity of the Product to sell; can't be below 0
 * @property {Joi.string} image The link to the image in the S3 Bucket
 * @property {[Joi.string]} advertisingPlatforms The social media platformst to advertise the product on
 * @property {Joi.string} inStore Whether the product is listed in the store or not (yes or no); the default value is "yes"
 * @exports updateProductJSONValidationSchema Function to create the expected schema for the JSON body when updating new Products
 */
export const updateProductJSONValidationSchema = Joi.object
(
    {
        name: Joi.string(),
        description: Joi.string(),
        tags: Joi.array(),
        price: Joi.number().min(0.00),
        qtyInStock: Joi.number().integer().min(0),
        image: Joi.string(),
        advertisingPlatforms: Joi.array(),
        inStore: Joi.string().valid("yes", "no")
    }
);