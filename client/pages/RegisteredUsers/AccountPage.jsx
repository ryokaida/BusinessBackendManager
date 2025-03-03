"use client"

/**
 * This file contains the Account page.
 * Authenticated users can access this page.
 * 
 * This page incorporates the module {@link module:../components/Account/EmailField} to handle the Input Field for Email.
 * This page incorporates the module {@link module:../components/Account/PasswordField} to handle the Input Field for Password.
 * This page incorporates the module {@link module:../components/Account/NameField} to handle the Input Field for Name.
 * This page incorporates the module {@link module:../components/Account/SubmitButton} to handle the Submit Button.
 * 
 * @module AccountPage
 * @requires module:../components/Account/EmailField Contains the logic for the Input Field for Email
 * @requires module:../components/Account/PasswordField Contains the logic for the Input Field for Password
 * @requires module:../components/Account/NameField Contains the logic for the Input Field for Name
 * @requires module:../components/Account/SubmitButton Contains the logic for the Submit button
 * @exports AccountPage The Account Page that is accessible by authenticated users
 * @todo Separate email/name change section from change password and implement logic
 */
import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";
import EmailField from "../../components/Account/EmailField";
import NameField from "../../components/Account/NameField";
import SubmitButton from "../../components/Account/SubmitButton";
import PasswordField from "../../components/Account/PasswordField";
import { Toaster } from "../../src/components/ui/toaster";

const AccountPage = () =>
{
    const logout = async () =>
    {
        const { data } = await fetch("/api/logout",
        {
            method: "POST"
        });
        //const { success, message } = await data.json();
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
                aria-label="Account header in mint green font"
            >
                Account
            </Heading>
            <br /><br />

            {/** Change Email or Name */}
            <Heading
                as={"h3"}
                color={"green.300"}
                aria-label="Update Name/Email subheader in mint green font"
            >
                Update Name/Email
            </Heading>
            <form>
                <Stack gap="4" align="flex-start" maxW="sm">
                    {/** Change Email */}
                    <EmailField />
                    <br />

                    {/** Change Name */}
                    <NameField />
                    <br />

                    {/** Submit Email/Name Change */}
                    <SubmitButton name="submitEmailOrNameChange" />
                </Stack>
            </form>
            
            <br /><br />
            <hr />
            <br /><br />

            {/** Change Password */}
            <Heading
                as={"h3"}
                color={"green.300"}
                aria-label="Update Password subheader in mint green font"
            >
                Update Password
            </Heading>
            <form>
                <Stack gap="4" align="flex-start" maxW="sm">
                    {/** Enter old password to validate user's authorization */}
                    <Text
                        color={"green.300"}
                        aria-label="Text that says Enter old Password in mint green font "
                    >
                        Enter old Password
                    </Text>
                    <PasswordField />
                    <br />

                    {/** Enter new password */}
                    <Text
                        color={"green.300"}
                        aria-label="Text that says Enter new Password in mint green font "
                    >
                        Enter new Password
                    </Text>
                    <PasswordField />
                    <br />

                    {/** Enter new password again  */}
                    <Text
                        color={"green.300"}
                        aria-label="Text that says Enter new Password again in mint green font "
                    >
                        Enter new Password again
                    </Text>
                    <PasswordField />
                    <br />

                    {/** Submit Password Change */}
                    <SubmitButton name="submitPasswordChange" />
                </Stack>
            </form>

            <br /><br />
            <hr />
            <br /><br />

            {/** Logout */}
            <Button
                variant="solid"
                color={"black"}
                bg={"yellow.400"}
                size={"lg"}
                _hover={{ bg: "yellow.600" }}
                aria-label="large medium yellow button that says Logout in black font"
                onClick={logout}
            >
                Logout
            </Button>

            {/** <Toaster />Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
};

export default AccountPage;