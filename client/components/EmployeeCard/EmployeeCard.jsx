"use client"

/**
 * This file contains User Cards that will be displayed on the Manage Employees Page.
 * The User Cards appear for owners on the Manage Employee Page.
 * 
 * This page incorporates the module {@link module:./UserCardInfoText.jsx} to display the User's information.
 * This page incorporates the module {@link module:./EditAndDeleteButtons.jsx} so that the owner can edit and delete Users.
 * 
 * @module UserCard
 * @requires module:./UserCardInfoText.jsx Creates the information text about the User being displayed
 * @requires module:./EditAndDeleteButtons.jsx The Edit User and Delete User buttons that appear only for the owner
 * @param {Object} User The User to  be displayed on the card
 * @exports UserCard The User card with the User's information, etc.
 */
import { Box, Heading, HStack, Container, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import UserCardInfoText from "./EmployeeCardInfoText";
import EditRoleAndDeleteButtons from "./EditRoleAndDeleteButtons";

const UserCard = ({User}) => {
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
            aria-label="box that displays the User and its info.  the background is medium green."
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
                                aria-label={"Dialog header that says " + User.email + "in black font, and it is underlined"}
                            >
                                <u>{User.email}</u>
                            </Heading>
                            
                            {/** Show the User information. */}
                            <UserCardInfoText data={User.name} InfoTextName={"Name"} />
                            <UserCardInfoText data={User.role} InfoTextName={"Role"} />
                        </Box>
                    </Container>
                    
                    {/* Show the Edit and Delete Buttons, and pass the current User into the component. */}
                    <EditRoleAndDeleteButtons User={User} />
                </HStack>
            </Box>
        </Box>
    );
}

export default UserCard;