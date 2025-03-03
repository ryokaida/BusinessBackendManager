"use client"

/**
 * This file contains the Login page.
 * Only non-authenticated users can access this page.
 * 
 * This page incorporates the module {@link module:../components/Account/EmailField} to handle the Input Field for Email.
 * This page incorporates the module {@link module:../components/Account/PasswordField} to handle the Input Field for Password.
 * 
 * @module LoginPage
 * @requires module:../components/Account/EmailField Contains the logic for the Input Field for Email
 * @requires module:../components/Account/PasswordField Contains the logic for the Input Field for Password
 * @exports LoginPage The Login Page that is accessible by non-authenticated users
 * @todo Solve error directly after calling the login API
 */
import { Container, Heading, Stack, Button } from "@chakra-ui/react";
import EmailField from "../components/Account/EmailField";
import PasswordField from "../components/Account/PasswordField";
import { useState } from "react";
import { Toaster } from "../src/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const LoginPage = () =>
{
    const navigate = useNavigate();
    const [inputValue, setInputvalue] = useState(
    {
        email: "",
        password: ""
    });

    const { email, password } = inputValue;

    /**
     * Ensure that the updated User Account Info values can be passed from the pertinent Input Field back to the Signup.jsx.
     * Source: https://www.shecodes.io/athena/322353-how-to-pass-state-variable-to-another-component-in-react
     * @param {*} valueFromChild The new value for the Account Info from the Input Field
     */
    const [updatedAccountValueFromChild, setUpdatedAccountValueFromChild] = useState();
    const handleStateChange = (valueFromChild) =>
    {
        {/** Get the new value from the Input Field. */}
        setUpdatedAccountValueFromChild(valueFromChild);
        console.debug("NEW VALUE IN SIGNUP BEFORE STATE UPDATE: " + JSON.stringify(valueFromChild));
        const { name, value } = updatedAccountValueFromChild;
        console.debug("NEW VALUE IN SIGNUP AFTER STATE UPDATE: " + JSON.stringify(updatedAccountValueFromChild));

        {/** Set the new Account Info with the entered values. */}
        setInputvalue(
        {
            ...inputValue,
            [name]: value,
        });
        console.log("TEST: " +JSON.stringify(inputValue))
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try
        {
            const loginUser =
            {
                email: email,
                password: password,
            };
            const { data } = await fetch("/api/login",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginUser),
                credentials: "include"
            });
            const { success, message } = await data.json();
            if (success)
            {
                console.log("SUCCESS LOGIN");
                setTimeout(() => 
                {
                    navigate("/account");
                }, 1000);
            }
            else
            {
                console.log("ERROR LOGIN");
            }
        }
        catch (error)
        {
            console.log("ERROR LOGIN: " + JSON.stringify(error));
        }
        setInputvalue(
        {
            ...inputValue,
            email: "",
            password: ""
        });
    };

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
                aria-label="Login header in mint green font"
            >
                Login
            </Heading>
            <br /><br />

            <form>
                <Stack gap="4" align="flex-start" maxW="sm">
                    {/** Enter Email */}
                    <EmailField
                        onStateChange={handleStateChange}
                    />
                    <br />

                    {/** Enter Password */}
                    <PasswordField
                        onStateChange={handleStateChange}
                    />
                    <br />

                    {/** Click Submit button */}
                    <Button
                        type="submit"
                        variant="solid"
                        color={"black"}
                        bg={"yellow.300"}
                        size={"lg"}
                        _hover={{ bg: "yellow.500" }}
                        aria-label="large light yellow button that says Submit in black font"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Stack>
            </form>

            {/** Click Signup Button */}
            <br /><br />
            <Button
                asChild
                variant="solid"
                color={"black"}
                bg={"yellow.400"}
                size={"sm"}
                _hover={{ bg: "yellow.600" }}
                aria-label="small medium yellow button that says Signup in black font"
            >
                <a href="/signupPage">Signup</a>
            </Button>

            {/** Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
};

export default LoginPage;