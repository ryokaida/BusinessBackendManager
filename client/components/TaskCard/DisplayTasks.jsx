"use client"

/**
 * This file contains the logic to display the Tasks on the Tasks Page.
 * This will appear for employees on the Tasks Page.
 * 
 * This page incorporates the module {@link module:../../store/tasks_store} to access the global state for Tasks.
 * This page incorporates the module {@link module:./TaskCard.jsx} to display the Task Cards.
 * 
 * @module DisplayTasks
 * @requires module:../../store/tasks_store Stores the global state for Tasks
 * @requires module:./TaskCard.jsx Creates the Task Cards to display on the screen
 * @exports DisplayTasks The Task card with the Task's information, etc.
 */
import { VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useTasksStore } from "../../store/tasks_store";
import TaskCard from "./TaskCard";

const DisplayTasks = () =>
{
    {/** Set to URL for the API Call to filter on where completed is "yes" */}
    const getURL = "/api/tasks?completed=no";

    /** Use the Tasks Store to get all of the Tasks to do */
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
                    {/** For each Task in Tasks, mark the _id as its key and pass each Task into TaskCard. */
                        Tasks.map((Task) => (
                            <TaskCard key={Task._id} Task={Task} showCompleteButton={"yes"} />
                        ))}
                </VStack>

                {/** Display no Tasks to do */
                Tasks.length === 0 && (
                    <Text
                        textAlign={"left"}
                        fontWeight={"bold"}
                        color={"green.100"}
                        fontSize={"lg"}
                        aria-label="large-ish Text that says No Tasks in very pale green font"
                    >
                        No Tasks
                    </Text>
                )}
            </VStack>
        </>
    );
}

export default DisplayTasks;