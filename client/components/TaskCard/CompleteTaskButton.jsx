"use client"

/**
 * This file contains Complete Task Button that employees use to complete their tasks on the Tasks page.
 * This appears for employees only.
 * 
 * This page incorporates the module {@link module:../components/DisplayTasks} to display the Tasks.
 * 
 * @module CompleteTaskButton
 * @requires module:../components/DisplayTasks Contains the logic to display the Tasks
 * @param {Object} Task The task being completed
 * @exports CompleteTaskButton The button to for employees to complete their tasks on the Tasks Page
 * @todo Make it so that the user only needs to click the button once.
 */
import { Container, IconButton, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";;
import { displayToast } from "../../util/displayToast";
import { useTasksStore } from "../../store/tasks_store"
import { Check } from 'lucide-react';


const CompleteTaskButton = ({Task}) =>
{
    /** Use updatedTask from the Task Store so that the state can be manipulated. */
    const [updatedTask, setUpdatedTask] = useState(Task);
    /** Import the functions from the Product Store so that the state can be manipulated. */
    const { updateTask } = useTasksStore();

    /**
     * Use the Tasks Store to complete the task.  This will set "completed" to "yes".
     * If the update was not successful, show the error toast popup.  Otherwise, show, the success toast popup.
     */
    const handleUpdateTask = async (Task, updatedTask) => {
        console.debug("BOUGHT Task BEFORE API CALL: " + JSON.stringify(updatedTask));

        {/** Make API Call to update completion status of Task. */}
        const { success,message } = await updateTask(Task, updatedTask);
        displayToast(success, message);
    }

    return(
        <Container alignItems={"right"}>
            <VStack
                spacing={2}
            >
                <IconButton
                    colorPalette={"yellow"}
                    aria-label="Yellow Button with a check on it to complete the task"
                    onClick={() => {
                        setUpdatedTask({ ...updatedTask, completed: "yes" });
                        handleUpdateTask(Task._id, updatedTask);
                    }}
                >
                    <Check />
                </IconButton>
            </VStack>
        </Container>
    );
}

export default CompleteTaskButton;