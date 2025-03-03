"use client"

/**
 * This file contains logic for Update Field so that the owner can edit product information.
 * The Update Field only appears for owners on the Manage Products Page.
 * 
 * Source for object[key] syntax: https://www.geeksforgeeks.org/how-to-add-key-value-pair-to-a-javascript-object/
 * 
 * @module UpdateField
 * @param {Function} onStateChange Function used to pass the updated value back to the Add Product Component
 * @param {string} helperText The helper text for the field
 * @param {string} fieldName The Name of the field, used as the field label
 * @param {*} productValueName The product value that is being updated
 * @param {string} placeholderText Text to use as the place holder in the field
 * @exports UpdateField The Input Field for the owner to edit product information
 */
import { Field, Input } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const UpdateField = ({onStateChange, helperText, fieldName, productValueName, placeholderText}) =>
{
    /** Set up an empty value for Updated Product. */
    const [updatedProductValue, setUpdatedProductValue] = useState({});

    /**
     * Update the updated product with the inputted value
     * Source for handleOnChange syntax: source: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
     * @function handleOnChange
     * @param {*} e The inputted value with its name and value
     */
    const handleOnChange = (e) =>
    {
        const { name, value } = e.target;
        console.debug("NAME: " + name);
        console.debug("VALUE: " + value);
        setUpdatedProductValue(
        {
            name: name,
            value: value,
        });
        onStateChange(updatedProductValue);
        console.debug("NEW VALUE FROM UPDATEDFIELD: " + JSON.stringify(updatedProductValue));
    };

    return(
        <>
            <Field.Root>
                <Field.Label
                    aria-label={"Label for the " + fieldName + " Field"}
                >
                    {fieldName}
                </Field.Label>
                {/** Set the updated product to use the current value entered whenever the field is changed.  */}
                <Input
                    placeholder={placeholderText}
                    variant="subtle"
                    bg={"yellow.100"}
                    name={productValueName}
                    aria-label={"Very light yellow Input Field that accepts " + fieldName}
                    value={updatedProductValue[productValueName]}
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

export default UpdateField;