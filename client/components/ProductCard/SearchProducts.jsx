"use client"

/**
 * This file contains the logic to Search for products by name.
 * Non-authenticated users and owners can access this component.
 * 
 * This page incorporates the module {@link module:../../store/products_store} to access the global state for Products.
 * 
 * @module SearchProduct
 * @requires module:../../store/products_store Stores the global state for Products
 * @exports SearchProduct The component for searching Products by name that is accessible by non-authenticated users and owners
 */
import { Field, Input, IconButton, HStack } from "@chakra-ui/react";
import { useState } from "react";;
import { Search } from 'lucide-react';
import { useProductsStore } from "../../store/products_store";

const SearchProduct = () =>
{
    /** Set searchedProduct to an empty Product. */
    const [searchedProduct, setSearchedProduct] = useState({
        name: ""
    });
    /** Use the Product Store to get the inputted Product. */
    const { getAProduct } = useProductsStore();
    const handleGetAProduct = async (product)  => {
        await getAProduct(product);
    }

    return(
        <>
            <HStack maxWidth={"lg"}>
                <Field.Root>
                    {/** Set the searched Product to the current value entered whenever it is changed. */}
                    <Input
                        variant="subtle"
                        bg={"green.100"}
                        placeholder="Enter a Product name"
                        name="search"
                        aria-label="Input Field that accepts Product name as text"
                        value={searchedProduct.name}
                        onChange={(e) => setSearchedProduct({ ...searchedProduct, name: e.target.value })}
                    />
                </Field.Root>
                <IconButton
                    variant="outline"
                    bg={"green.400"}
                    color={"green.800"}
                    _hover={{ bg: "green.100" }}
                    aria-label="Button with a magnifying glass to Search Products"
                    onClick={() => handleGetAProduct(searchedProduct)}
                >
                    <Search />
                </IconButton>
            </HStack>
        </>
    );
};

export default SearchProduct;