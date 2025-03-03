"use client"

/**
 * This file contains logic for Add Field so that the owner can add a product.
 * The Add Field only appears for owners on the Manage Products Page.
 * 
 * Source for object[key] syntax: https://www.geeksforgeeks.org/how-to-add-key-value-pair-to-a-javascript-object/
 * 
 * @module AddField
 * @param {Function} onStateChange Function used to pass the updated value back to the Add Product Component
 * @param {string} helperText The helper text for the field
 * @param {string} fieldName The Name of the field, used as the field label
 * @param {*} productValueName The product value that is being updated
 * @param {string} placeholderText Text to use as the place holder in the field
 * @exports AddField The Input Field for the owner to add a product
 */
import { Field, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const AddField = ({helperText, fieldName, productValueName, placeholderText, onStateChange}) =>
{
    /** Set up an empty value for New Product. */
    const [newProductValue, setNewProductValue] = useState({});

    /**
     * Update the new product with the inputted value
     * Source for handleOnChange syntax: source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
     * @function handleOnChange
     * @param {*} e The inputted value with its name and value
     */
    const handleOnChange = (e) =>
    {
        const { name, value } = e.target;
        console.debug("NAME: " + name);
        console.debug("VALUE: " + value);
        setNewProductValue(
        {
            name: name,
            value: value,
        });
        onStateChange(newProductValue);
        console.debug("NEW VALUE FROM ADDFIELD: " + JSON.stringify(newProductValue));
    };

    return(
        <>
            <Field.Root required>
                <Field.Label
                    aria-label={"Label for the " + fieldName + " Field.  This field is required and marked with a red asterisk."}
                >
                    {fieldName}
                    <Field.RequiredIndicator />
                </Field.Label>
                {/** Set the updated product to use the current value entered whenever the field is changed.  */}
                <Input
                    placeholder={placeholderText}
                    name={productValueName}
                    variant="subtle"
                    bg={"yellow.100"}
                    aria-label={"Very pale yellow Input Field that accepts " + fieldName}
                    value={newProductValue[productValueName]}
                    onChange={handleOnChange}
                />
                <Field.HelperText
                    color={"gray.700"}
                    aria-label={"Help text that says " + helperText + " in dark gray font"}
                >
                    {helperText}
                </Field.HelperText>
            </Field.Root>
            <br />
        </>
    );
};

export default AddField;