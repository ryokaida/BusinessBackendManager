"use client"

/**
 * This file contains the Employee's links in the Navbar.
 * 
 * @module EmployeeLinks
 * @exports EmployeeLinks The Employee's links in the Navbar
 */
import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const EmployeeLinks = () =>
{
    return(
        <>
            <HStack
                spacing={2}
                alignItems={"Left"}
            >
                {/** Link to the Tasks Page for the Employee */}
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    textAlign={"left"}
                    color={"green.600"}
                    aria-label="Link that says Tasks in green font with a dividing | after it"
                >
                    <Link to={"/todoTasks"}>Tasks</Link> | 
                </Text>

                {/** Link to the Completed Tasks Page for the Employee */}
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    textAlign={"left"}
                    color={"green.600"}
                    aria-label="Link that says Completed Tasks in green font with a dividing | after it"
                >
                    <Link to={"/completedTasks"}>CompletedTasks</Link>
                </Text>
            </HStack>
        </>
    );
};

export default EmployeeLinks;