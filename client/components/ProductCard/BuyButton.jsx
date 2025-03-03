"use client"

/**
 * This file contains Buy Button used to buy products on the Store Page.
 * This appears for non-authenticated users only.
 * 
 * This page incorporates the module {@link module:../../store/products_store} to access the global state for Products.
 * This page incorporates the module {@link module:../components/DisplayProducts} to display the products.
 * 
 * @module Products
 * @requires module:../../store/products_store Stores the global state for Products
 * @requires module:../components/DisplayProducts Contains the logic to display the products
 * @exports BuyButton The button to buy Products on the Store Page
 * @todo Move logic for setting inStore from the frontend code to a script in MongoDB Atlas
 * @todo Make it so that the user only needs to click the button once.
 */
import { Button, Container, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useProductsStore } from "../../store/products_store";
import { displayToast } from "../../util/displayToast";
import { toaster } from "../../src/components/ui/toaster";
import { useTasksStore } from "../../store/tasks_store";

const BuyButton = ({product}) =>
{
    /** Use updatedProduct from the Product Store so that the state can be manipulated. */
    const [updatedProduct, setUpdatedProduct] = useState(product);
    /** Import the functions from the Product Store so that the state can be manipulated. */
    const { deleteProduct, updateProduct } = useProductsStore()
    const { createTask } = useTasksStore();

    const handleUpdateProduct = async (product, updatedProduct) => {
        {/** If the entered price is over 0, then set inStore to "yes".  Otherwise, set inStore to "no". */}
        if (updatedProduct.qtyInStock > 0)
        {
            updatedProduct.inStore = "yes";
        }
        else
        {
            updatedProduct.inStore = "no";
        }

        console.debug("BOUGHT PRODUCT BEFORE API CALL: " + JSON.stringify(updatedProduct));

        {/** Make API Call to update product quantity. */}
        const buyResult = await updateProduct(product, updatedProduct);
        displayToast(buyResult.success, buyResult.message);
        if (buyResult.success)
        {
            toaster.create({
                title: "Success",
                description: "Successfully bought " + updatedProduct.name + "!",
                type: "success",
                duration: 5000,
                isClosable: true
            });
        }

        {/** Ship Product */}
        /** 
         * Get employee that should ship.
         * Source for syntax of loop: https://stackoverflow.com/questions/19529403/how-can-i-loop-through-a-javascript-object-array
         * Source for random number: https://www.w3schools.com/js/js_random.asp
         * Source for array info: https://www.w3schools.com/js/js_arrays.asp
         * @todo Update logic to assign the next task to the employee with the least amount of tasks
         * 1. Get all employees.
         * 2. Iterate through all employees and get the amount of tasks they have.
         * 3. Assign the task to the person with the least amount of tasks.
        */
        console.log("Retreiving Employee that will ship the Product");
        let arrintEmployeeEmails = [];
        const allEmployeesRes = await fetch("/api/users?role=employee");
        const allEmployees = await allEmployeesRes.json();
        for (let i = 0; i < allEmployees.data.length; i++)
        {
            arrintEmployeeEmails.push(allEmployees.data[i].email); 
        }
        const intIndexForEmployeeGettingTask = Math.floor(Math.random() * allEmployees.data.length);
        const strEmployeeGettingTask = arrintEmployeeEmails[intIndexForEmployeeGettingTask];

        /** Create New Task object and Make API Call to add task to employee. */
        const newTask =
        {
            product: updatedProduct.name,
            employee: strEmployeeGettingTask
        };
        const shipResult = await createTask(newTask);
        displayToast(shipResult.success, shipResult.message);
        if (shipResult.success)
        {
            toaster.create({
                title: "Success",
                description: updatedProduct.name + " will be shipped shortly.",
                type: "success",
                duration: 5000,
                isClosable: true
            });
        }
    }

    return(
        <Container alignItems={"right"}>
            <VStack
                spacing={2}
            >                              
                <Button
                    type="submit"
                    variant="solid"
                    color={"black"}
                    bg={"yellow.300"}
                    _hover={{ bg: "yellow.500" }}
                    aria-label="light yellow button that says Buy in black font"
                    onClick={() => {
                        setUpdatedProduct({ ...updatedProduct, qtyInStock: (product.qtyInStock - 1) });
                        handleUpdateProduct(product._id, updatedProduct);
                    }}
                >
                    Buy
                </Button>
            </VStack>
        </Container>
    );
}

export default BuyButton;