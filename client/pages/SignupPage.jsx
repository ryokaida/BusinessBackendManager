"use client"

/**
 * This file contains the Signup page.
 * Only non-authenticated users can access this page.
 * 
 * Source for authentication logic: https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
 * 
 * This page incorporates the module {@link module:../components/Account/EmailField} to handle the Input Field for Email.
 * This page incorporates the module {@link module:../components/Account/PasswordField} to handle the Input Field for Password.
 * This page incorporates the module {@link module:../components/Account/NameField} to handle the Input Field for Name.
 * 
 * @module SignupPage
 * @requires module:../components/Account/EmailField Contains the logic for the Input Field for Email
 * @requires module:../components/Account/PasswordField Contains the logic for the Input Field for Password
 * @requires module:../components/Account/NameField Contains the logic for the Input Field for Name
 * @exports SignupPage The Signup Page that is accessible by non-authenticated users
 * @todo Solve error directly after calling the signup API
 */
import { Container, Heading, Stack, Button } from "@chakra-ui/react";
import EmailField from "../components/Account/EmailField";
import NameField from "../components/Account/NameField";
import PasswordField from "../components/Account/PasswordField";
import { Toaster } from "../src/components/ui/toaster";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () =>
{
    const navigate = useNavigate();
    const [inputValue, setInputvalue] = useState(
    {
        email: "",
        password: "",
        name: ""
    });

    const { email, password, name } = inputValue;
    
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
            const signupUser =
            {
                email: email,
                password: password,
                name: name
            };
            console.log("POST: " + JSON.stringify(inputValue))
            const { data } = await fetch("/api/signup",
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupUser),
            });
            console.log("READ JSON")
            const { success, message } = await data.json();
            if (success)
            {
                console.log("SUCCESS SIGNUP");
                setTimeout(() =>
                {
                    navigate("/account");
                }, 1000);
            }
            else
            {
                console.log("ERROR SIGNUP");
            }
        }
        catch (error)
        {
            console.log("ERROR SIGNUP: " + JSON.stringify(error));
        }
        setInputvalue(
        {
            ...inputValue,
            email: "",
            password: "",
            name: ""
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
                aria-label="Signup header in mint green font"
            >
                Signup
            </Heading>
            <br /><br />

            <form>
                <Stack gap="4" align="flex-start" maxW="sm">
                    {/** Enter Email */}
                    <EmailField
                        onStateChange={handleStateChange}
                    />
                    <br />

                    {/** Enter Name */}
                    <NameField
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

            {/** Click Login button */}
            <br /><br />
            <Button
                asChild
                variant="solid"
                color={"black"}
                bg={"yellow.400"}
                size={"sm"}
                _hover={{ bg: "yellow.600" }}
                aria-label="small medium yellow button that says Login in black font"
            >
                <a href="/loginPage">Login</a>
            </Button>

            {/** Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
};

export default SignupPage;