"use client"

import { Input } from "@chakra-ui/react";
import { Field } from "../../src/components/ui/field";
import { useState } from "react";

const NameField = ({onStateChange}) =>
{
    const [submittedName, setName] = useState({})
    const handleOnChange = (e) =>
    {
        setName(
        {
            name: "name",
            value: e.target.value
        });
        onStateChange(submittedName);
        console.debug("SUBMITTED NAME: " + JSON.stringify(submittedName));
    };

    return(
        <>
            <Field
                label="Name"
                color={"green.400"}
                name="name"
                value={submittedName.name}
                aria-label="medium green Input Field labeled Name in the same color font, accepts Name as text"
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
}

export default NameField;