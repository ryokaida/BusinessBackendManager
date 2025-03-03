"use client"

/**
 * This file contains Tasks page, where employees can view their tasks and complete them.  Once tasks are completed, the will be moved from this page to the Completed Tasks page.
 * Only employees can access this page.
 * 
 * This page incorporates the module {@link module:../../components/TaskCard/DisplayTasks} to display the tasks.
 * 
 * @module Tasks
 * @requires module:../../components/TaskCard/DisplayTasks Contains the logic to display the tasks
 * @exports Tasks The Tasks for the employee to complete
 */
import { Container, Heading } from "@chakra-ui/react";
import { Toaster } from "../../src/components/ui/toaster";
import DisplayTasks from "../../components/TaskCard/DisplayTasks";

const Tasks = () =>
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
                aria-label="Tasks header in mint green font"
            >
                Tasks
            </Heading>
            <br /><br />
            
            {/** Display Tasks */}
            <DisplayTasks />

            {/* Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
};

export default Tasks;