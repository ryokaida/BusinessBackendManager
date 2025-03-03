"use client"

/**
 * This file contains the logic to Search for Employees by email.
 * Only owners can access this component.
 * 
 * This page incorporates the module {@link module:../../store/users_store} to access the global state for Users.
 * 
 * @module SearchUser
 * @requires module:../../store/users_store Stores the global state for Users
 * @exports SearchUser The component for searching Users by email that is accessible by owners
 */
import { Field, Input, IconButton, HStack } from "@chakra-ui/react";
import { useState } from "react";;
import { UserRoundSearch } from 'lucide-react';
import { useUsersStore } from "../../store/users_store";

const SearchUser = () => 
{
    /** Set searchedUser to an empty User. */
    const [searchedUser, setSearchedUser] = useState({
        name: ""
    });
    /** Use the User Store to get the inputted User. */
    const { getAUser } = useUsersStore();
    const handleGetAUser = async (User)  => {
        await getAUser(User);
    }

    return(
        <>
            <HStack maxWidth={"lg"}>
                <Field.Root>
                    {/** Set the searched User to the current value entered whenever it is changed. */}
                    <Input
                        variant="subtle"
                        bg={"green.100"}
                        placeholder="Enter a User name"
                        name="search"
                        aria-label="Input Field that accepts User name as text"
                        value={searchedUser.email}
                        onChange={(e) => setSearchedUser({ ...searchedUser, email: e.target.value })}
                    />
                </Field.Root>
                <IconButton
                    variant="outline"
                    bg={"green.400"}
                    color={"green.800"}
                    _hover={{ bg: "green.100" }}
                    aria-label="Button with a magnifying glass to Search Users"
                    onClick={() => handleGetAUser(searchedUser)}
                >
                    <UserRoundSearch />
                </IconButton>
            </HStack>
        </>
    );
};

export default SearchUser;