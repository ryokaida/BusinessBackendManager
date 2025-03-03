/**
 * This file sets and managages the global state for Tasks.
 * 
 * This page incorporates the module {@link module:../util/storeHelper} to perform the API Calls.
 * 
 * @module useTasksStore
 * @requires module:../util/storeHelper Helper script to perform the API Calls
 * @exports useTasksStore The global state of the Tasks
 */
import { create } from "zustand";
import { callAPI } from "../util/storeHelper";

export const useTasksStore = create((set) => ({
    /**
     * Copy of all of the Tasks for filtering
     * Source: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     */
    TasksCopy: [],
    Tasks: [],
    setTasks: (Tasks) => set({ Tasks }),
    /**
     * Make a new Task.
     * @param {JSON} newTask The new Task
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    createTask: async (newTask) => {
        console.log("API: " + JSON.stringify(newTask))
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        });
        const data = await res.json();
        
        /** If there is an error, return the error status/message. */
        if (!data.success)
        {
            console.error("Error creating Task! Error code: " + res.status + " | Error mesage: " + data.message);
            return { success: false, message: "Error creating Task! Error code: " + res.status + " | Error mesage: " + data.message };
        }

        /** Add the data from the response to the state. */
        console.info("Successfully added Task.  Status code: " + res.status);
        console.log("TEST: " + JSON.stringify(data));
        set((state) => ({ Tasks:[...state.Tasks,data.data] }));
        return { success: true, message: "Sucessfully added Task.  Status code: " + res.status };
    },
    /**
     * Get all Tasks from the database via API and set them in the state.
     * @param {String} in_StrURL The URL to use for the API call
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    getTasks: async (in_StrURL) => {
        const TaskResult = await callAPI(in_StrURL, "GET");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (TaskResult.success)
        {
            set({ Tasks: TaskResult.data });
        }
        return TaskResult;
    },
    /**
     * Update the rating of the incoming Task via API.
     * @param {String} TaskID The _id of the task
     * @param {JSON} udpatedTask The JSON Body for the updated task
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     * @todo Ensure that page can instantly update to show new list of todo tasks
     */
    updateTask: async (TaskID, updatedTask) => {
        console.log("making a copy of updatedProject to construct valid JSON body");
        let updatedTaskCopy = { ...updatedTask };
        delete updatedTaskCopy._id;
        delete updatedTaskCopy.createdAt;
        delete updatedTaskCopy.updatedAt;
        delete updatedTaskCopy.__v;

        const strURL = "/api/tasks/" + TaskID;
        const TaskResult = await callAPI(strURL, "PUT", JSON.stringify(updatedTaskCopy));

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (TaskResult.success)
        {
            /** Enable instant refresh with the updated data where task completion is "no" */
            set((state) => ({
                Tasks: state.Tasks.map((Task) => (Task._id === TaskID ? TaskResult.data : Task))
            }));
        }
              
        return TaskResult;
    }
}));