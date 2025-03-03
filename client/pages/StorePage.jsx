"use client"

/**
 * This file contains Store page.  This store page is currently simulating a connection to an online store such as Shopify.
 * Only non-authenticated users can access this page.
 * 
 * This page incorporates the module {@link module:../components/DisplayProducts} to display the products.
 * This page incorporates the module {@link module:../components/ProductCard/SearchProducts} to search the products by name.
 * 
 * @module StorePage
 * @requires module:../components/DisplayProducts Contains the logic to display the products
 * @requires module:../components/ProductCard/SearchProducts Logic to search products by name
 * @exports StorePage The Store Page that is accessible by non-authenticated users
 */
import { Container, Heading, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import DisplayProducts from "../components/ProductCard/DisplayProducts";
import { Toaster } from "../src/components/ui/toaster";
import SearchProduct from "../components/ProductCard/SearchProducts";

const StorePage = () =>
{
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
                aria-label="Store header in mint green font"
                color={"green.300"}
            >
                Store
            </Heading>
            <br /><br />

            {/** Search for Products by name */}
            <HStack maxW={"full"}>
                <SearchProduct />
            </HStack>
            <br /><br />
            
            {/** Display prodcuts */}
            <DisplayProducts showOwnerButtons={"no"} />

            {/* Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
}

export default StorePage;