"use client"

/**
 * This file contains CompletedTask Cards that will be displayed on the CompletedTasks Page.
 * The CompletedTask Cards appear for employees on the CompletedTasks Page.
 * 
 * This page incorporates the module {@link module:../TaskCard/TaskCardInfoText} to display the Completed Task's information.
 * 
 * @module CompletedTaskCard
 * @requires module:../TaskCard/TaskCardInfoText Creates the information text about the Completed Task being displayed
 * @param {Object} CompletedTask The CompletedTask to  be displayed on the card
 * @exports CompletedTaskCard The Completed Task card with the Completed Task's information, etc.
 */
import { Box, Heading, HStack, Container } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import TaskCardInfoText from "../TaskCard/TaskCardInfoText";

const CompletedTaskCard = ({CompletedTask}) => {
    return(
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 03.s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            mb={4}
            bg={"green.600"}
            maxWidth={"lg"}
            aria-label="box that displays the CompletedTask and its info.  the background is medium green."
        >
            <Box p={4}>
                <HStack spacing={4}>
                    <Container>
                        <Box p={1}>
                            <Heading
                                as="h2"
                                size="2xl"
                                mb={2}
                                color={"black"}
                                aria-label={"Dialog header that says " + CompletedTask.product + " - " + CompletedTask.employee + " in black font.  The Product is underlined"}
                            >
                                <u>{CompletedTask.product}</u> - {CompletedTask.employee}
                            </Heading>

                            {/** Show the CompletedTask information. */}
                            <TaskCardInfoText data={CompletedTask.completed} InfoTextName={"Completed"} />
                        </Box>
                    </Container>
                    
                    {/* Show the Complete Button, and pass the current CompletedTask into the component. */}
                </HStack>
            </Box>
        </Box>
    );
}

export default CompletedTaskCard;