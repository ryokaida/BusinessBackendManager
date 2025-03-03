"use client"

/**
 * This file contains Info text for Products that is displayed on the Product Card
 * The Info Text appears for non-authenticated users on the Store Page and owners on the Manage Products Page.
 * 
 * @module ProductCardInfoText
 * @param {Object} data The data to display on the Product Card
 * @param {string} InfoTextName The Label for the data displayed
 * @exports ProductCardInfoText Info text for Products that is displayed on the Product Card
 */
import { Text } from "@chakra-ui/react";

const ProductCardInfoText = ({data, InfoTextName}) =>
{
    let dataToPrint = ""
    /**
     * Reformat Price, Advertising Platforms, and Tags so that they look nicer.
     * @function formatData
     * @returns {string} Returns dataToPrint - The data to print on the Product Card after being formatted (if needed)
     */
    function formatData()
    {
        if (InfoTextName === "Price")
        {
            dataToPrint = String("$" + data);
        }
        else if (InfoTextName === "Advertising Platforms" || InfoTextName === "Tags")
        {
            dataToPrint = JSON.stringify(data);
        }
        else
        {
            dataToPrint = data;
        }
        return dataToPrint;
    }

    return(
        <>
            <Text
                mb={4}
                aria-label={"Text on dialog that says " + InfoTextName + ": " + dataToPrint + "in black font.  The Text is bolded."}
                onLoad={formatData()}
            >
                <strong>{InfoTextName}</strong>: {dataToPrint}
            </Text>
        </>
    );
}

export default ProductCardInfoText;