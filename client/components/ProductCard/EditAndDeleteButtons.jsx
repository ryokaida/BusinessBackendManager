"use client"

/**
 * This file contains logic for the Edit and Delete buttons so that the owner can edit/delete products.
 * The Edit product and Delete product buttons only appear for owners on the Manage Products Page.
 * 
 * This page incorporates the module {@link module:../../store/products_store.js} to access the global state for Products.
 * This page incorporates the module {@link module:./UpdateField.jsx} to display the Input Field where the product information can be edited.
 * This page incorporates the module {@link module:../../util/displayToast.js} so the user feedback can be displayed after the API call.
 * 
 * @module EditAndDeleteButtons
 * @requires module:../../store/products_store.js Stores the global state for Products
 * @requires module:./UpdateField.jsx Input Field where the user can update Product information
 * @requires module:../../util/displayToast.js Script to display the correct Toast (user feedback) based on the result of the API Call
 * @param {Object} product The product to  be displayed on the card
 * @exports EditAndDeleteButtons The Edit and Delete buttons for the owner to edit/delete products
 * @todo Move logic for setting inStore from the frontend code to a script in MongoDB Atlas
 */
import { useProductsStore } from "../../store/products_store.js";
import { VStack, IconButton, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Pencil, Trash2 } from 'lucide-react';
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
import UpdateField from "./UpdateField.jsx";

const EditAndDeleteButtons = ({product}) =>
{
    const ref = useRef<HTMLInputElement>(null);

    /** Use updatedProduct from the Product Store so that the state can be manipulated. */
    const [updatedProduct, setUpdatedProduct] = useState(product);

    /**
     * Ensure that the updated Product values can be passed from AddField.jsx back to the Add Product.jsx.
     * Source: https://www.shecodes.io/athena/322353-how-to-pass-state-variable-to-another-component-in-react
     * @param {*} valueFromChild The new value for the Product from AddField.jsx
     */
    const [updatedProductValueFromChild, setUpdatedProductValueFromChild] = useState();
    const handleStateChange = (valueFromChild) =>
    {
        {/** Get the new value from the AddField. */}
        setUpdatedProductValueFromChild(valueFromChild);
        console.debug("NEW VALUE IN UPDATEPRODUCT BEFORE STATE UPDATE: " + JSON.stringify(valueFromChild));
        const { name, value } = updatedProductValueFromChild;
        console.debug("NEW VALUE IN UPDATEPRODUCT AFTER STATE UPDATE: " + JSON.stringify(updatedProductValueFromChild));

        {/** Set the new product with the entered values. */}
        setUpdatedProduct(
        {
            ...updatedProduct,
            [name]: value,
        });
    }

    /** Import the functions from the Product Store so that the state can be manipulated. */
    const { deleteProduct, updateProduct } = useProductsStore();

    /**
     * Use the Product Store to delete a product.
     * If the update was not successful, show the error toast popup.  Otherwise, show, the success toast popup. 
     */
    const handleDeleteProduct = async (product) => {
        const { success, message } = await deleteProduct(product);
        displayToast(success, message);
    }

    /**
     * Use the Product Store to update the product.
     * If the update was not successful, show the error toast popup.  Otherwise, show, the success toast popup.
     */
    const handleUpdateProduct = async (product, updatedProduct) => {
        {/** If the entered price is over 0, then set inStore to "yes".  Otherwise, set inStore to "no". */}
        if (updatedProduct.qtyInStock > 0)
        {
            updatedProduct.inStore = "yes";
        }
        else
        {
            updatedProduct.inStore = "no";
        }

        {/** Convert Advertising Platforms and Tags back into arrays of strings if needbe */}
        if (updatedProduct.advertisingPlatforms)
        {
            updatedProduct.advertisingPlatforms = String(updatedProduct.advertisingPlatforms).split(",");
        }
        if (updatedProduct.tags)
        {
            updatedProduct.tags = String(updatedProduct.tags).split(",");
        }
        console.debug("NEW PRODUCT BEFORE API CALL: " + JSON.stringify(updatedProduct));

        {/** Make API Call to update product. */}
        const { success,message } = await updateProduct(product, updatedProduct);
        displayToast(success, message);
    }

    return(
        <>
            <VStack
            spacing={2}
        >
            <DialogRoot initialFocusEl={() => ref.current}>
                {/** Edit button */}
                <DialogTrigger asChild>
                    <IconButton
                        variant="surface"
                        colorPalette={"yellow"}
                        aria-label="Yellow Button with a pencil on in black font it to Edit the Product"
                    >
                        <Pencil />
                    </IconButton>
                </DialogTrigger>
                {/** The popup where the user can edit the Product */}
                <DialogContent
                    bg={"orange.400"}
                    aria-label="sherbert orange dialog popup to Edit Product"
                >
                    <DialogHeader>
                        <DialogTitle
                            aria-label="Dialog header that says Edit Product in black font"
                        >
                            Edit Product
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                        <UpdateField
                            fieldName={"Product Name"}
                            helperText={"Enter Product Name as text"}
                            onStateChange={handleStateChange}
                            productValueName={"name"}
                            placeholderText={"Product Name"}
                        />
                        <UpdateField
                            fieldName={"Description"}
                            helperText={"Enter Description as text"}
                            onStateChange={handleStateChange}
                            productValueName={"description"}
                            placeholderText={"This is a product"}
                        />
                        <UpdateField
                            fieldName={"Price"}
                            helperText={"Enter Price as a number"}
                            onStateChange={handleStateChange}
                            productValueName={"price"}
                            placeholderText={"1.99"}
                        />
                        <UpdateField
                            fieldName={"Quantity in Stock"}
                            helperText={"Enter Quantity in Quantity is a whole number"}
                            onStateChange={handleStateChange}
                            productValueName={"qtyInStock"}
                            placeholderText={"3"}
                        />
                        <UpdateField
                            fieldName={"Advertising Platforms"}
                            helperText={"Enter Advertising Platforms as a comma-delimited list of strings"}
                            onStateChange={handleStateChange}
                            productValueName={"advertisingPlatforms"}
                            placeholderText={"Instagram,Facebook"}
                        />
                        <UpdateField
                            fieldName={"Tags"}
                            helperText={"Enter Tag as a comma-delimited list of strings"}
                            onStateChange={handleStateChange}
                            productValueName={"tags"}
                            placeholderText={"art,home decor"}
                        />
                    </DialogBody>
                    <DialogFooter>
                        {/** The Cancel button */}
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
                        {/** The Save button */}
                        <DialogActionTrigger asChild>
                            <Button
                                bg={"green.700"}
                                _hover={{ bg: "green.800", color: "white" }}
                                aria-label="Green Button that says Save in white font"
                                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                            >
                                Save
                            </Button>
                            </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
            {/** The Delete button */}
            <IconButton
                colorPalette={"red"}
                aria-label="Bold red Button with a trash can in white font on it to Delete Product"
                onClick={() => {handleDeleteProduct(product._id)}}
            >
                <Trash2 />
            </IconButton>
        </VStack>
        </>
    );
};

export default EditAndDeleteButtons;