"use client"

/**
 * This file contains Info text for Tasks that is displayed on the Task Card
 * The Info Text appears for non-authenticated Tasks on the Store Page and owners on the Manage Tasks Page.
 * 
 * @module TaskCardInfoText
 * @param {Object} data The data to display on the Task Card
 * @param {string} InfoTextName The Label for the data displayed
 * @exports TaskCardInfoText Info text for Tasks that is displayed on the Task Card
 */
import { Text } from "@chakra-ui/react";

const TaskCardInfoText = ({data, InfoTextName}) =>
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

export default TaskCardInfoText;