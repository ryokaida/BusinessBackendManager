"use client"

/**
 * This file contains logic for the Add button so that the owner can add products.
 * The Add button only appears for owners on the Manage Products Page.
 * 
 * Source for splitting strings into an array: https://www.w3schools.com/jsref/jsref_split.asp
 * 
 * This page incorporates the module {@link module:../../store/products_store.js} to access the global state for Products.
 * This page incorporates the module {@link module:./AddField.jsx} to display the Input Field where the product information can be added.
 * This page incorporates the module {@link module:../../util/displayToast.js} so the user feedback can be displayed after the API call.
 * 
 * @module AddProduct
 * @requires module:../../store/products_store.js Stores the global state for Products
 * @requires module:./AddField.jsx Input Field where the user can Add Product information
 * @requires module:../../util/displayToast.js Script to display the correct Toast (user feedback) based on the result of the API Call
 * @exports AddProduct The Edit and Delete buttons for the owner to edit/delete products
 * @todo Move logic for setting inStore from the frontend code to a script in MongoDB Atlas
 */
import { useProductsStore } from "../../store/products_store.js";
import { IconButton, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Plus } from 'lucide-react';
import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogActionTrigger
  } from "../../src/components/ui/dialog.jsx"
import { displayToast } from '../../util/displayToast.js';
import AddField from "./AddField.jsx";
import { toaster } from "../../src/components/ui/toaster.jsx";

const AddProduct = () =>
{
    /** Set up an empty newProduct. */
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        tags: [],
        price: 0.00,
        qtyInStock: 0,
        image: "",
        advertisingPlatforms: [],
        inStore: "no"

    });

    /**
     * Ensure that the new Product values can be passed from AddField.jsx back to the Add Product.jsx.
     * Source: https://www.shecodes.io/athena/322353-how-to-pass-state-variable-to-another-component-in-react
     * @param {*} valueFromChild The new value for the Product from  AddField.jsx
     */
    const [newProductValueFromChild, setNewProductValueFromChild] = useState();
    const handleStateChange = (valueFromChild) =>
    {
        {/** Get the new value from the AddField. */}
        setNewProductValueFromChild(valueFromChild);
        console.debug("NEW VALUE IN ADDPRODUCT BEFORE STATE UPDATE: " + JSON.stringify(valueFromChild));
        const { name, value } = newProductValueFromChild;
        console.debug("NEW VALUE IN ADDPRODUCT AFTER STATE UPDATE: " + JSON.stringify(newProductValueFromChild));

        {/** Set the new product with the entered values. */}
        setNewProduct(
        {
            ...newProduct,
            [name]: value,
        });
    }

    /** 
     * Use the Products Store to add the new Product.
     * If the add was not successful, show the error toast popup.  Otherwise, show, the success toast popup.
    */
    const { createProduct } = useProductsStore();
    const handleAddProduct = async () => {
        {/** If the entered price is over 0, then set inStore to "yes".  Otherwise, set inStore to "no". */}
        if (newProduct.qtyInStock > 0)
        {
            newProduct.inStore = "yes";
        }
        else
        {
            newProduct.inStore = "no";
        }

        {/** Convert Advertising Platforms and Tags back into arrays of strings */}
        newProduct.advertisingPlatforms = String(newProduct.advertisingPlatforms).split(",");
        newProduct.tags = String(newProduct.tags).split(",");
        console.debug("NEW PRODUCT BEFORE API CALL: " + JSON.stringify(newProduct));

        {/** Make API Call to add product. */}
        const { success, message } = await createProduct(newProduct);
        displayToast(success, message);
        {/** Display toast for automatically advertising Product */}
        if (success)
        {
            toaster.create({
                title: "Success",
                description: "Using API to automatically advertise " + newProduct.name + ".  THIS IS A TODO",
                type: "success",
                duration: 5000,
                isClosable: true
            });
        }
    };

    return(
        <>
            <DialogRoot initialFocusEl={() => ref.current}>
                <DialogTrigger asChild>
                    <IconButton
                        variant="outline"
                        bg={"green.400"}
                        color={"green.800"}
                        _hover={{ bg: "green.100" }}
                        aria-label="Medium green Button with a plus icon to Add Product"
                    >
                        <Plus />
                    </IconButton>
                </DialogTrigger>
                <DialogContent
                    bg={"orange.400"}
                    aria-label="sherbert orange dialog popup to Add Product"
                >
                    <DialogHeader>
                        <DialogTitle
                            aria-label="Dialog header that says Add Product"
                        >
                            Add Product
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                        <AddField
                            fieldName={"Product Name"}
                            helperText={"Enter Product Name as text"}
                            productValueName={"name"}
                            placeholderText={"Product Name"}
                            onStateChange={handleStateChange}
                        />
                        <AddField
                            fieldName={"Description"}
                            helperText={"Enter Description as text"}
                            productValueName={"description"}
                            placeholderText={"This is a product"}
                            onStateChange={handleStateChange}
                        />
                        <AddField
                            fieldName={"Price"}
                            helperText={"Enter Price as a number"}
                            productValueName={"price"}
                            placeholderText={"1.99"}
                            onStateChange={handleStateChange}
                        />
                        <AddField
                            fieldName={"Quantity"}
                            helperText={"Enter Quantity as a whole number"}
                            productValueName={"qtyInStock"}
                            placeholderText={"3"}
                            onStateChange={handleStateChange}
                        />
                        <AddField
                            fieldName={"Advertising Platforms"}
                            helperText={"Enter Advertising Platforms as a comma-delimted list of strings"}
                            productValueName={"advertisingPlatforms"}
                            placeholderText={"Instagram,Facebook"}
                            onStateChange={handleStateChange}
                        />
                        <AddField
                            fieldName={"Tags"}
                            helperText={"Enter Product Name as an comma-delimted list of strings"}
                            productValueName={"tags"}
                            placeholderText={"art,home decor"}
                            onStateChange={handleStateChange}
                        />
                        <AddField
                            fieldName={"IMAGE"}
                            helperText={"Enter Image as a file upload"}
                            productValueName={"image"}
                            placeholderText={"image"}
                            onStateChange={handleStateChange}
                        />
                    </DialogBody>
                    <DialogFooter>
                        <DialogActionTrigger asChild>
                            <Button
                                variant={"ghost"}
                                bg={"red.500"}
                                _hover={{ bg: "red.600", color: "black" }}
                                aria-label="Red Button that says Cancel in black font"
                            >
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                            <Button
                                bg={"green.700"}
                                _hover={{ bg: "green.800", color: "white" }}
                                aria-label="Green Button that says Add in white font"
                                onClick={() => handleAddProduct()}
                            >
                                Add
                            </Button>
                        </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
        </>
    );
};

export default AddProduct;