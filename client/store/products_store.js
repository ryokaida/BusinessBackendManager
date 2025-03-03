/**
 * This file sets and managages the global state for Products.
 * 
 * This page incorporates the module {@link module:../util/storeHelper} to perform the API Calls.
 * 
 * @module useProductsStore
 * @requires module:../util/storeHelper Helper script to perform the API Calls
 * @exports useProductsStore The global state of the Products
 */
import { create } from "zustand";
import { callAPI } from "../util/storeHelper";

export const useProductsStore = create((set) => ({
    /**
     * Copy of all of the products for filtering
     * Source: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     */
    productsCopy: [],
    products: [], 
    setProducts: (products) => set({ products }),
    /**
     * Make a new Product.
     * @param {JSON} newProduct The new product
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    createProduct: async (newProduct) => {
        console.log("API: " + JSON.stringify(newProduct))
        const res = await fetch("/api/products", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        
        /** If there is an error, return the error status/message. */
        if (!data.success)
        {
            console.error("Error creating Product! Error code: " + res.status + " | Error mesage: " + data.message);
            return { success: false, message: "Error creating Product! Error code: " + res.status + " | Error mesage: " + data.message };
        }

        /** Add the data from the response to the state. */
        console.info("Successfully added Product.  Status code: " + res.status);
        console.log("TEST: " + JSON.stringify(data));
        set((state) => ({ products:[...state.products,data.data] }));
        return { success: true, message: "Sucessfully added Product.  Status code: " + res.status };
    },
    /**
     * Get all Products from the database via API and set them in the state.
     * @param {String} in_StrURL The URL to use for the API call
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    getProducts: async (in_StrURL) => {
        const productResult = await callAPI(in_StrURL, "GET");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (productResult.success)
        {
            set({ products: productResult.data });
        }
              
        return productResult;
    },
    /**
     * Make a copy of all of the Products in the database so that it can be filtered when searching.
     * Source: for some logic: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     * @param {String} in_StrURL The URL to use for the API call
     * @returns {JSON} The result as JSON - ({ success: bool, message: string })
     */
    getProductsCopy: async (in_StrURL) => {
        const productResult = await callAPI(in_StrURL, "GET");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (productResult.success)
        {
            set({ productsCopy: productResult.data });
        }
              
        return productResult;
    },
    /** 
     * Delete the incoming Product via API and set the state to the remaining Products in the database.
     * @returns {JSON} The result as JSON - ({ success: bool, message: string })
     */
    deleteProduct: async (productID) => {
        const strURL = "/api/products/" + productID;
        const productResult = await callAPI(strURL, "DELETE");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (productResult.success)
        {
            /** Enable instant refresh with the updated data */
            set(state => ({ products: state.products.filter(product => product._id !== productID)}));
        }
              
        return productResult;
    },
    /**
     * Update the rating of the incoming Product via API.
     * @param {String} ProductID The _id of the product
     * @param {JSON} udpatedProduct The JSON Body for the updated product
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    updateProduct: async (productID, updatedProduct) => {
        console.log("making a copy of updatedProject to construct valid JSON body");
        let updatedProductCopy = { ...updatedProduct };
        delete updatedProductCopy._id;
        delete updatedProductCopy.createdAt;
        delete updatedProductCopy.updatedAt;
        delete updatedProductCopy.__v;

        const strURL = "/api/products/" + productID;
        const productResult = await callAPI(strURL, "PUT", JSON.stringify(updatedProductCopy));

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (productResult.success)
        {
            /** Enable instant refresh with the updated data */
            set((state) => ({
                products: state.products.map((product) => (product._id === productID ? productResult.data : product))
            }));
        }
              
        return productResult;
    },
    /**
     * Search for a Product by filtering
     * Source for logic: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     * @param {string} productName The name of the product
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    getAProduct: async (productName) => {
        let outputMessage = ""

        /** If there is an error, return the error status/message. */
        if (!productName.name)
        {
            outputMessage = "Product is empty, not performing search";
            set(state => ({ products: state.productsCopy }));
        }
        else
        {
            outputMessage = "Successfully performed search";
            /** Enable instant refresh with the only the searched Product. */
            set(state => ({ products: state.productsCopy.filter(product => product.name.toUpperCase() === productName.name.toUpperCase())}));
        }

        console.info(outputMessage);
        return { success: true, message: outputMessage };
    }
}));