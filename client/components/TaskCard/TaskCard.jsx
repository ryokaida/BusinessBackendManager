"use client"

/**
 * This file contains Task Cards that will be displayed on the Tasks Page.
 * The Task Cards appear for employees on the Tasks Page.
 * 
 * This page incorporates the module {@link module:./TaskCardInfoText.jsx} to display the Task's information.
 * This page incorporates the module {@link module:./CompleteTaskButton} so that the employee can complete tasks.
 * 
 * @module TaskCard
 * @requires module:./TaskCardInfoText.jsx Creates the information text about the Task being displayed
 * @requires module:"./CompleteTaskButton The Complete button that appears only for employees
 * @param {Object} Task The Task
 * @param {string} showCompleteButton Whether to show the complete button or not; "no" - don't show button; "yes" - show button
 * @exports TaskCard The Task card with the Task's information, etc.
 */
import { Box, Heading, HStack, Container, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import TaskCardInfoText from "./TaskCardInfoText";
import CompleteTaskButton from "./CompleteTaskButton";

const TaskCard = ({Task, showCompleteButton}) => {
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
            aria-label="box that displays the Task and its info.  the background is medium green."
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
                                aria-label={"Dialog header that says " + Task.product + " - " + Task.employee + " in black font.  The Product is underlined"}
                            >
                                <u>{Task.product}</u> - {Task.employee}
                            </Heading>

                            {/** Show the Task information. */}
                            <TaskCardInfoText data={Task.completed} InfoTextName={"Completed"} />
                        </Box>
                    </Container>
                    
                    {/* Show the Complete Button, and pass the current Task into the component. */}
                    {/** Display no Completed Tasks to do */
                    showCompleteButton === "yes" && (
                        <CompleteTaskButton Task={Task}/>
                    )}
                </HStack>
            </Box>
        </Box>
    );
}

export default TaskCard;