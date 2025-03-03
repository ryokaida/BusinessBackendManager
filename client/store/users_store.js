/**
 * This file sets and managages the global state for Users.
 * 
 * This page incorporates the module {@link module:../util/storeHelper} to perform the API Calls.
 * 
 * @module useUsersStore
 * @requires module:../util/storeHelper Helper script to perform the API Calls
 * @exports useUsersStore The global state of the Users
 */
import { create } from "zustand";
import { callAPI } from "../util/storeHelper";

export const useUsersStore = create((set) => ({
    /**
     * Copy of all of the users for filtering
     * Source: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     */
    UsersCopy: [],
    Users: [], 
    setUsers: (Users) => set({ Users }),
    /**
     * Make a new User.
     * @param {JSON} newUser The new user
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    createUser: async (newUser) => {
        console.log("API: " + JSON.stringify(newUser))
        const res = await fetch("/api/users", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        const data = await res.json();
        
        /** If there is an error, return the error status/message. */
        if (!data.success)
        {
            console.error("Error creating User! Error code: " + res.status + " | Error mesage: " + data.message);
            return { success: false, message: "Error creating User! Error code: " + res.status + " | Error mesage: " + data.message };
        }

        /** Add the data from the response to the state. */
        console.info("Successfully added User.  Status code: " + res.status);
        console.log("TEST: " + JSON.stringify(data));
        set((state) => ({ Users:[...state.Users,data.data] }));
        return { success: true, message: "Sucessfully added User.  Status code: " + res.status };
    },
    /**
     * Get all Users from the database via API and set them in the state.
     * @param {String} in_StrURL The URL to use for the API call
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    getUsers: async (in_StrURL) => {
        const UserResult = await callAPI(in_StrURL, "GET");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (UserResult.success)
        {
            set({ Users: UserResult.data });
        }
              
        return UserResult;
    },
    /**
     * Make a copy of all of the Users in the database so that it can be filtered when searching.
     * Source: for some logic: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     * @param {String} in_StrURL The URL to use for the API call
     * @returns {JSON} The result as JSON - ({ success: bool, message: string })
     */
    getUsersCopy: async (in_StrURL) => {
        const UserResult = await callAPI(in_StrURL, "GET");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (UserResult.success)
        {
            set({ UsersCopy: UserResult.data });
        }
              
        return UserResult;
    },
    /** 
     * Delete the incoming User via API and set the state to the remaining Users in the database.
     * @returns {JSON} The result as JSON - ({ success: bool, message: string })
     */
    deleteUser: async (UserID) => {
        const strURL = "/api/users/" + UserID;
        const UserResult = await callAPI(strURL, "DELETE");

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (UserResult.success)
        {
            /** Enable instant refresh with the updated data */
            set(state => ({ Users: state.Users.filter(User => User._id !== UserID)}));
        }
              
        return UserResult;
    },
    /**
     * Update the rating of the incoming User via API.
     * @param {String} UserID The _id of the user
     * @param {JSON} udpatedUser The JSON Body for the updated user
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    updateUser: async (UserID, updatedUser) => {
        console.log("making a copy of updatedProject to construct valid JSON body");
        let updatedUserCopy = { ...updatedUser };
        delete updatedUserCopy._id;
        delete updatedUserCopy.createdAt;
        delete updatedUserCopy.updatedAt;
        delete updatedUserCopy.__v;

        const strURL = "/api/users/" + UserID;
        const UserResult = await callAPI(strURL, "PUT", JSON.stringify(updatedUserCopy));

        /**
         * If the API Call was successful, then add the data from the response to the state.
         */
        if (UserResult.success)
        {
            /** Enable instant refresh with the updated data */
            set((state) => ({
                Users: state.Users.map((User) => (User._id === UserID ? UserResult.data : User))
            }));
        }
              
        return UserResult;
    },
    /**
     * Search for a User by filtering
     * Source for logic: https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
     * @param {string} UserEmail The email of the user
     * @returns {JSON} The result as JSON - ({ success: bool, message: string, data: JSON (only if successful) })
     */
    getAUser: async (UserEmail) => {
        let outputMessage = ""

        /** If there is an error, return the error status/message. */
        if (!UserEmail.email)
        {
            outputMessage = "User is empty, not performing search";
            set(state => ({ Users: state.UsersCopy }));
        }
        else
        {
            outputMessage = "Successfully performed search";
            /** Enable instant refresh with the only the searched User. */
            set(state => ({ Users: state.UsersCopy.filter(User => User.email.toUpperCase() === UserEmail.email.toUpperCase())}));
        }

        console.info(outputMessage);
        return { success: true, message: outputMessage };
    }
}));