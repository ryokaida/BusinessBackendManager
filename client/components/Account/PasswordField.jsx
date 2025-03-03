"use client"

import { Field } from "../../src/components/ui/field";
import { PasswordInput } from "../../src/components/ui/password-input";
import { useState } from "react";

const PasswordField = ({onStateChange}) =>
{
    const [submittedPassword, setPassword] = useState({})
    const handleOnChange = (e) =>
    {
        setPassword(
        {
            name: "password",
            value: e.target.value
        });
        onStateChange(submittedPassword);
        console.debug("SUBMITTED PASSWORD: " + JSON.stringify(submittedPassword));
    };

    return(
        <>
            <Field
            label="Password"
            color={"green.400"}
            name="password"
            value={submittedPassword.password}
            aria-label="medium green Input Field labeled Password in the same color font, accepts password as text"
            onChange={handleOnChange}
            >
            <PasswordInput
                variant="subtle"
                bg={"green.400"}
                color={"black"}
            />
            </Field>
        </>
    );
}

export default PasswordField;