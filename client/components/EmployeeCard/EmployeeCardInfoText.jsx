"use client"

/**
 * This file contains Info text for Users that is displayed on the User Card
 * The Info Text appears for non-authenticated users on the Store Page and owners on the Manage Users Page.
 * 
 * @module UserCardInfoText
 * @param {Object} data The data to display on the User Card
 * @param {string} InfoTextName The Label for the data displayed
 * @exports UserCardInfoText Info text for Users that is displayed on the User Card
 */
import { Text } from "@chakra-ui/react";

const UserCardInfoText = ({data, InfoTextName}) =>
{
    return(
        <>
            <Text
                mb={4}
                aria-label={"Text on dialog that says " + InfoTextName + ": " + data + "in black font.  The Text is bolded."}
            >
                <strong>{InfoTextName}</strong>: {data}
            </Text>
        </>
    );
}

export default UserCardInfoText;