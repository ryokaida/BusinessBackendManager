"use client"

import { Input } from "@chakra-ui/react";
import { Field } from "../../src/components/ui/field";
import { useState } from "react";

const EmailField = ({onStateChange}) =>
{
    const [submittedEmail, setEmail] = useState({})
    const handleOnChange = (e) =>
    {
        setEmail(
        {
            name: "email",
            value: e.target.value
        });
        onStateChange(submittedEmail);
        console.debug("SUBMITTED EMAIL: " + JSON.stringify(submittedEmail));
    };

    return(
        <>
            <Field
                label="Email"
                name="email"
                color={"green.400"}
                value={submittedEmail.email}
                aria-label="medium green Input Field labeled Email in the same color font, accepts Email as text"
                onChange={handleOnChange}
            >
                <Input
                    variant="outline"
                    bg={"green.400"}
                    color={"black"}
                />
            </Field>
        </>
    );
};

export default EmailField;