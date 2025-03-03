"use client"

/**
 * This file contains Completed Tasks page, where employees can view their Completed Tasks.
 * Only employees can access this page.
 * 
 * This page incorporates the module {@link module:../../components/CompletedTasks/DisplayCompletedTasks} to display the Completed Tasks.
 * 
 * @module CompletedTasks
 * @requires module:../../components/CompletedTasks/DisplayCompletedTasks Contains the logic to display the Completed Tasks
 * @exports CompletedTasks The Tasks that the employee has completed
 */
import { Container, Heading } from "@chakra-ui/react";
import { Toaster } from "../../src/components/ui/toaster";
import DisplayCompletedTasks from "../../components/CompletedTasks/DisplayCompletedTasks";

const CompletedTasks = () =>
{
    return(
        <Container
            minH="100vh"
            maxW={"full"}
            py={12}
            bg={"gray.900"}
        >
            <Heading
                as={"h1"}
                size={"4xl"}
                color={"green.300"}
                aria-label="Completed Tasks header in mint green font"
            >
                Completed Tasks
            </Heading>
            <br /><br />
            
            {/** Display Completed Tasks. */}
            <DisplayCompletedTasks />

            {/* Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
};

export default CompletedTasks;