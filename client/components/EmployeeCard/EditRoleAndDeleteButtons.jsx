"use client"

/**
 * This file contains logic for the Edit and Delete buttons so that the owner can edit users' roles or delete Users.
 * The Edit role and Delete user buttons only appear for owners on the Manage Users Page.
 * 
 * This page incorporates the module {@link module:../../store/Users_store.js} to access the global state for Users.
 * This page incorporates the module {@link module:../../util/displayToast.js} so the user feedback can be displayed after the API call.
 * 
 * @module EditRoleAndDeleteButtons
 * @requires module:../../store/Users_store.js Stores the global state for Users
 * @requires module:../../util/displayToast.js Script to display the correct Toast (user feedback) based on the result of the API Call
 * @param {Object} User The User to  be displayed on the card
 * @exports EditRoleAndDeleteButtons The Edit and Delete buttons for the owner to edit users' roles or delete Users
 */
import { HStack, VStack, IconButton, Button, DialogBackdrop, createListCollection } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { UserRoundMinus, UserRoundPen } from 'lucide-react';
import {
    DialogBody,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
    DialogActionTrigger
} from "../../src/components/ui/dialog.jsx"
import {
    Radio,
    RadioGroup
} from "../../src/components/ui/radio"
import { displayToast } from '../../util/displayToast.js';
//import UpdateField from "./UpdateField.jsx";
import { useUsersStore } from "../../store/users_store.js";

const EditRoleAndDeleteButtons = ({User}) =>
{
    /** Use updatedUser from the User Store so that the state can be manipulated. */
    const [updatedUser, setUpdatedUser] = useState(User);

    const [value, setValue] = useState(updatedUser.role);

    /**
     * Ensure that the updated User values can be passed from AddField.jsx back to the Add User.jsx.
     * Source: https://www.shecodes.io/athena/322353-how-to-pass-state-variable-to-another-component-in-react
     * @param {*} valueFromChild The new value for the User from  AddField.jsx
     */
    const [updatedUserValueFromChild, setUpdatedUserValueFromChild] = useState();
    const handleStateChange = (valueFromChild) =>
    {
        {/** Get the new value from the AddField. */}
        setUpdatedUserValueFromChild(valueFromChild);
        console.debug("NEW VALUE IN UPDATEUser BEFORE STATE UPDATE: " + JSON.stringify(valueFromChild));
        const { name, value } = updatedUserValueFromChild;
        console.debug("NEW VALUE IN UPDATEUser AFTER STATE UPDATE: " + JSON.stringify(updatedUserValueFromChild));


    }

    /** Import the functions from the User Store so that the state can be manipulated. */
    const { deleteUser, updateUser } = useUsersStore();

    /**
     * Use the User Store to delete a User.
     * If the update was not successful, show the error toast popup.  Otherwise, show, the success toast popup. 
     */
    const handleDeleteUser = async (User) => {
        const { success, message } = await deleteUser(User);
        displayToast(success, message);
    }

    /**
     * Use the User Store to update the User.
     * If the update was not successful, show the error toast popup.  Otherwise, show, the success toast popup.
     */
    const handleUpdateUser = async (User, updatedUser) => {
        console.debug("NEW User BEFORE API CALL: " + JSON.stringify(updatedUser));

        {/** Make API Call to update User. */}
        const { success,message } = await updateUser(User, updatedUser);
        displayToast(success, message);
    }

    return(
        <>
            <VStack
            spacing={2}
        >
            <DialogRoot>
                <DialogBackdrop />
                {/** Edit button */}
                <DialogTrigger asChild>
                    <IconButton
                        variant="surface"
                        colorPalette={"yellow"}
                        aria-label="Yellow Button with a pencil on in black font it to Edit the User"
                    >
                        <UserRoundPen />
                    </IconButton>
                </DialogTrigger>
                {/** The popup where the owner can edit the User's role */}
                <DialogContent
                    bg={"orange.400"}
                    aria-label="sherbert orange dialog popup to Edit User"
                >
                    <DialogHeader>
                        <DialogTitle
                            aria-label="Dialog header that says Edit User's Role in black font"
                        >
                            Edit User's Role
                        </DialogTitle>
                    </DialogHeader>
                    <DialogBody pb="4">
                        <RadioGroup
                            variant="outline"
                            value={value}
                            aria-label={"Radio group with the options of Employee, Owner, and Guest.  The Radio buttons are solid black circles with a flotating black circle around it.  " + value + " is currently selected."}
                            onValueChange={(e) => 
                                {
                                    /** Set the new value for the Radio Group */
                                    setValue(e.value)
                                    /** Set the new User with the entered values. */
                                    setUpdatedUser({ ...updatedUser, role: value, });
                                    console.debug("VALUE FOR UPDATING EMPLOYEE: " + value)
                                    console.debug("ROLE FOR UPDATING EMPLOYEE: " + updatedUser.role)
                                }
                            }
                        >
                            <HStack gap={6}>
                                <Radio value="employee">Employee</Radio>
                                <Radio value="owner">Owner</Radio>
                                <Radio value="guest">Guest</Radio>
                            </HStack>
                        </RadioGroup>
                    </DialogBody>
                    <DialogFooter>
                        {/** The Cancel button */}
                        <DialogActionTrigger asChild>
                            <Button
                                variant={"ghost"}
                                bg={"red.500"}
                                _hover={{ bg: "red.600", color: "black" }}
                                aria-label="Red Button that says Cancel in black font"
                            >
                                Cancel
                            </Button>
                        </DialogActionTrigger>
                        {/** The Save button */}
                        <DialogActionTrigger asChild>
                            <Button
                                bg={"green.700"}
                                _hover={{ bg: "green.800", color: "white" }}
                                aria-label="Green Button that says Save in white font"
                                onClick={() => handleUpdateUser(User._id, updatedUser)}
                            >
                                Save
                            </Button>
                            </DialogActionTrigger>
                    </DialogFooter>
                </DialogContent>
            </DialogRoot>
            {/** The Delete button */}
            <IconButton
                colorPalette={"red"}
                aria-label="Bold red Button with a trash can on it to Delete User"
                onClick={() => {handleDeleteUser(User._id)}}
            >
                <UserRoundMinus />
            </IconButton>
        </VStack>
        </>
    );
};

const roles = createListCollection(
    {
        items:
        [
            {label: "Owner", value: "owner"},
            {label: "Employee", value: "employee"},
            {label: "Guest", value: "guest"}
        ]
    }
);
export default EditRoleAndDeleteButtons;