"use client"

/**
 * This file contains Manage Employees page, where owners can view their employees, search for employees by email, and update their employee's roles
 * Only owners can access this page.
 * 
 * This page incorporates the module {@link module:../../components/EmployeeCard/DisplayEmployees} to display the users.
 * This page incorporates the module {@link module:../../components/EmployeeCard/SearchEmployees} to search the users by email.
 * 
 * @module ManageEmployees
 * @requires module:../../components/EmployeeCard/DisplayEmployees Contains the logic to display the users
 * @requires module:../../components/EmployeeCard/SearchEmployees Logic to search Users by email
 * @exports ManageEmployees The Manage Products Page that is accessible by owners
 */
import { Container, Heading, HStack } from "@chakra-ui/react";
import DisplayUsers from "../../components/EmployeeCard/DisplayEmployees";
import { Toaster } from "../../src/components/ui/toaster";
import SearchUser from "../../components/EmployeeCard/SearchEmployees";

const ManageEmployees = () =>
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
                aria-label="Manage Employees header in mint green font"
            >
                Manage Employees
            </Heading>
            <br /><br />

            {/** Search for an Employee */}
            <HStack maxW={"full"}>
                <SearchUser />
            </HStack>
            <br /><br />
            
            {/** Display Employees */}
            <DisplayUsers />

            {/* Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
};

export default ManageEmployees;