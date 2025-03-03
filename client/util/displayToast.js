import { toaster } from "../src/components/ui/toaster";

/**
 * If the add was not successful, show the error toast popup.  Otherwise, show, the success toast popup.
 * @function displayToast
 * @param {boolean} in_BoolSuccess Whether the action was succesful or not
 * @param {string} in_StrMessage The message
 * @todo Change color so the toast doesn't blend in with the site
*/
export function displayToast(in_BoolSuccess, in_StrMessage)
{
    if (!in_BoolSuccess) {
        toaster.create({
            title: "Error",
            description: in_StrMessage,
            type: "error",
            duration: 5000,
            isClosable: true
        });
    }
    else {
        toaster.create({
            title: "Success",
            description: in_StrMessage,
            type: "success",
            duration: 5000,
            isClosable: true
        });
    }
}