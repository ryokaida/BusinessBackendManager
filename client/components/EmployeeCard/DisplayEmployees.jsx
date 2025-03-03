"use client"

/**
 * This file contains the logic to display the Employees on the Manage Employees Page.
 * This will appear for owners on the Manage Employees Page.
 * 
 * This page incorporates the module {@link module:../../store/users_store.js} to access the global state for Users.
 * This page incorporates the module {@link module:./EmployeeCard.jsx} to display the User Cards.
 * 
 * @module DisplayUsers
 * @requires module:../../store/users_store.js Stores the global state for Users
 * @requires module:./EmployeeCard.jsx Creates the User Cards to display on the screen
 * @exports DisplayUsers The User card with the User's information, etc.
 */
import { VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import UserCard from "./EmployeeCard.jsx";
import { useUsersStore } from "../../store/users_store.js";

const DisplayUsers = () =>
{
    const getURL = "/api/users"; // url to use for the get All API Call
    /** Make a copy of Users store based on the contents of the database so that filtering can be done. */
    const { getUsersCopy, UsersCopy } = useUsersStore();
    useEffect(() => {
        getUsersCopy(getURL);
    }, [getUsersCopy]);
    console.log("Creating copy of Users Store based on database contents");
    /** Use the Users Store to get all of the Users */
    const { getUsers, Users } = useUsersStore();
    useEffect(() =>
    {
        getUsers(getURL);
    }, [getUsers]);
    console.log("retrieved All Users from database");

    return(
        <>
            
            <VStack>
                <VStack
                    align={"left"}
                    spacing={10}
                    w={"full"}
                >
                    {/** For each User in Users, mark the _id as its key and pass each User into UserCard. */
                        Users.map((User) => (
                            <UserCard key={User._id} User={User} />
                        ))}
                </VStack>

                {/** Display no Users */
                Users.length === 0 && (
                    <Text
                        textAlign={"left"}
                        fontWeight={"bold"}
                        color={"green.100"}
                        fontSize={"lg"}
                        aria-label="large-ish Text that says No Users in very pale green font"
                    >
                        No Users
                    </Text>
                )}
            </VStack>
        </>
    );
}

export default DisplayUsers;