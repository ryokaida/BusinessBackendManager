"use client"

/**
 * This file contains the logic to display the Completed Tasks on the Completed Tasks Page.
 * This will appear for employees on the Completed Tasks Page.
 * 
 * This page incorporates the module {@link module:../../store/tasks_store} to access the global state for Tasks.
 * This page incorporates the module {@link module:../TaskCard/TaskCard} to display the Completed Task Cards.
 * 
 * @module DisplayCompletedTasks
 * @requires module:../../store/tasks_store Stores the global state for CompletedTasks
 * @requires module:../TaskCard/TaskCard Creates the CompletedTask Cards to display on the screen
 * @exports DisplayCompletedTasks The CompletedTask card with the CompletedTask's information, etc.
 */
import { VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTasksStore } from "../../store/tasks_store";
import TaskCard from "../TaskCard/TaskCard";

const DisplayCompletedTasks = () =>
{
    {/** Set to URL for the API Call to filter on where completed is "yes" */}
    const getURL = "/api/tasks?completed=yes";

    /** Use the Tasks Store to get all of the Completed Tasks */
    const { getTasks, Tasks } = useTasksStore();
    useEffect(() =>
    {
        getTasks(getURL);
    }, [getTasks]);
    console.log("retrieved All Tasks from database");

    return(
        <>
            <VStack>
                <VStack
                    align={"left"}
                    spacing={10}
                    w={"full"}
                >
                    {/** For each Completed Task in Completed Tasks, mark the _id as its key and pass each Completed Task into TaskCard. */
                        Tasks.map((Task) => (
                            <TaskCard key={Task._id} Task={Task} showCompleteButton={"no"} />
                        ))}
                </VStack>

                {/** Display no Completed Tasks to do */
                Tasks.length === 0 && (
                    <Text
                        textAlign={"left"}
                        fontWeight={"bold"}
                        color={"green.100"}
                        fontSize={"lg"}
                        aria-label="large-ish Text that says No Completed Tasks in very pale green font"
                    >
                        No Completed Tasks
                    </Text>
                )}
            </VStack>
        </>
    );
}

export default DisplayCompletedTasks;