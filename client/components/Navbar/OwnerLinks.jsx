"use client"

/**
 * This file contains the Owner's links in the Navbar.
 * 
 * @module OwnerLinks
 * @exports OwnerLinks The owner's links in the Navbar
 */
import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const OwnerLinks = () =>
{
    return(
        <>
            <HStack
                spacing={2}
                alignItems={"Left"}
            >
                {/** Link to the Manage Products Page for the Owner */}
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    textAlign={"left"}
                    color={"green.600"}
                    aria-label="Link that says Manage Products in green font with a dividing | after it"
                >
                    <Link to={"/manageProducts"}>Manage Products</Link> | 
                </Text>

                {/** Link to the Manage Employees Page for the Owner */}
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    textAlign={"left"}
                    color={"green.600"}
                    aria-label="Link that says Manage Employees in green font with a dividing | after it"
                >
                    <Link to={"/manageEmployees"}>Manage Employees</Link>
                </Text>
            </HStack>
        </>
    );
};

export default OwnerLinks;