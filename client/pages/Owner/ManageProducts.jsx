"use client"

/**
 * This file contains Manage Products page, where owners can view their products, edit products, delete products, add products, and search for products by name
 * Only owners can access this page.
 * 
 * This page incorporates the module {@link module:../components/DisplayProducts} to display the products.
 * This page incorporates the module {@link module:../../components/ProductCard/SearchProducts.jsx} to search the products by name.
 * 
 * @module ManageProducts
 * @requires module:../components/DisplayProducts Contains the logic to display the products
 * @requires module:../../components/ProductCard/SearchProducts.jsx Logic to search products by name
 * @exports ManageProducts The Manage Products Page that is accessible by owners
 */
import { Container, Heading, HStack, Text, Box } from "@chakra-ui/react";
import { useEffect } from "react";
import DisplayProducts from "../../components/ProductCard/DisplayProducts.jsx";
import { Toaster } from "../../src/components/ui/toaster.jsx";
import AddProduct from "../../components/ProductCard/AddProduct.jsx";
import SearchProduct from "../../components/ProductCard/SearchProducts.jsx";

const ManageProducts = () =>
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
                aria-label="Manage Products header in mint green font"
                color={"green.300"}
            >
                Manage Products
            </Heading>
            <br /><br />

            <HStack maxW={"full"}>
                {/** Add Product */}
                <AddProduct />
                {/** Dividing Line for Formatting */}
                <Box>
                    <Text
                        fontSize={"2xl"}
                        aria-label="Line that divides the Add Product button from the Search Products section"
                        color={"white"}
                    >
                        |                        
                    </Text>
                </Box>
                {/** Search for a Product */}
                <SearchProduct />
            </HStack>
            <br /><br />
            
            {/** Display prodcuts */}
            <DisplayProducts showOwnerButtons={"yes"} />

            {/* Make the Toaster object so that the toast popup can be created and displayed as needed */}
            <Toaster />
        </Container>
    );
}

export default ManageProducts;