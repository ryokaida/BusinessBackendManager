/**
 * This file contains the routes to use the Products API.  The Products API is called from module {@link module:../controllers/products_controller.js}.
 * 
 * Source for schema validation: https://joi.dev/api/?v=17.13.3
 * Source for validating that the incoming role is in the list of allowed roles via JOI: https://stackoverflow.com/questions/41408469/nodejs-joi-check-if-string-is-in-a-given-list
 * 
 * @module Products_routes
 * @requires module:../controllers/Products_controller.js The Products APIs
 */
import express from "express";
import { getAllProducts, addNewProduct, deleteAProduct, getAProductByID, updateAProduct } from "../controllers/products_controller.js";

/** Create a router that will allow other files to use the API routes */
const productRouter = express.Router();

/** Establish the routes for the APIs */
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getAProductByID);
productRouter.post("/", addNewProduct);
productRouter.put("/:id", updateAProduct);
productRouter.delete("/:id", deleteAProduct);

/**
 * @exports productRouter The exported router to to allow other files to use the API routes
 */
export default productRouter;