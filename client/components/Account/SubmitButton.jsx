"use client"

import { Button } from "@chakra-ui/react";

const SubmitButton = () =>
{
    return(
        <>
            <Button
                type="submit"
                variant="solid"
                color={"black"}
                bg={"yellow.300"}
                size={"lg"}
                _hover={{ bg: "yellow.500" }}
                aria-label="large light yellow button that says Submit in black font"
            >
                Submit
            </Button>
        </>
    );
}

export default SubmitButton;