"use client"

/**
 * This file contains the Navbar.
 * 
 * The navbar incorporates the module {@link module:./OwnerLinks} to display the owner's links.
 * The navbar incorporates the module {@link module:./EmployeeLinks} to display the employee's links.
 * 
 * @module Navbar
 * @requires module:./OwnerLinks The owner's links
 * @requires module:./EmployeeLinks The employee's links
 * @exports Navbar The Navbar
 */
import { Container, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { User } from 'lucide-react';
import OwnerLinks from "./OwnerLinks";
import EmployeeLinks from "./EmployeeLinks";

const Navbar = () =>
{
    return(
        <Container
            maxW={"full"}
            px={4}
            bg={"gray.800"}
        >
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", sm: "row" }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    color={"green.500"}
                    aria-label="Text that says Business Backend Manager in light green font"
                >
                    Welcome, USER!
                </Text>

                <HStack
                    spacing={2}
                    alignItems={"Left"}
                >
                    {/** Link to Homepage */}
                    <Text
                        fontSize={{ base: "22", sm: "28" }}
                        textAlign={"left"}
                        color={"green.600"}
                        aria-label="Link that says Home in green font with a dividing | after it"
                    >
                        <Link to={"/"}>Home</Link> | 
                    </Text>

                    {/** Display Owner's links in the Navbar */}
                    <OwnerLinks /> |

                    {/** Display Employee's links in the Navbar */}
                    <EmployeeLinks />

                    <Text
                        fontSize={{ base: "22", sm: "28" }}
                        textAlign={"left"}
                        color={"green.600"}
                        aria-label="Link that says Home in green font with a dividing | after it"
                    >
                        | <Link to={"/loginPage"}>Login</Link> | 
                    </Text>
                    <Text
                        fontSize={{ base: "22", sm: "28" }}
                        textAlign={"left"}
                        color={"green.600"}
                        aria-label="Link that says Home in green font with a dividing | after it"
                    >
                        <Link to={"/signupPage"}>Signup</Link> | 
                    </Text>
                </HStack>

                {/** Button to access Login/Signup/Account page */}
                <HStack
                    spacing={2}
                    alignItems={"center"}
                >
                    <Link
                        asChild
                        to={"/account"}
                    >
                        <IconButton
                            colorPalette={"yellow"}
                            fontSize={20}
                            aria-label="A yellow Login/Signup/Account button with a person icon in black font"
                        >
                            <User />
                        </IconButton>        
                    </Link>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;