export async function callAPI (in_StrURL, in_StrAPIFunction, in_StrBody)
{
    let returnMessage = "";
    let successMessage = "";
    let res;
    let apiArgs =
    {
        method: in_StrAPIFunction,
        headers:
        {
            "Content-Type": "application/json"
        }
    }
    
    /**
     * If the API call is not a GET call, then append the body to the api arguments.
     * Source for appending values to object: https://www.geeksforgeeks.org/how-to-add-key-value-pair-to-a-javascript-object/
     */
    if (in_StrAPIFunction !== "GET")
    {
        apiArgs.body = in_StrBody;
    }

    res = await fetch(in_StrURL, apiArgs);
    successMessage = "Successfully performed " + in_StrAPIFunction + " API Call";
    
    const data = await res.json();

    /**
     * If there is an error, then return the error status/message.
     */
    if (!data.success)
    {
        returnMessage = "Error performing " + in_StrAPIFunction + " API Call! Error code: " + res.status + " | Error message: " + data.message;
        console.log(returnMessage);
        return { success: false, message: returnMessage };
    }
    
    /**
     * Add the data from the response to the state.
     */
    returnMessage = successMessage + "  Status code: " + res.status;
    console.info(returnMessage);
    //set({ products: data.data });
    return { success: true, message: returnMessage, data: data.data };
}