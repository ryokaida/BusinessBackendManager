"use client"

/**
 * This file contains the logic to display the Products on the Store Page and the Manage Products Page.
 * This will appear for non-authenticated users on the Store Page and for owners on the Manage Products Page.
 * 
 * This page incorporates the module {@link module:../../store/products_store.js} to access the global state for Products.
 * This page incorporates the module {@link module:./ProductCard.jsx} to display the Product Cards.
 * 
 * @module DisplayProducts
 * @requires module:../../store/products_store.js Stores the global state for Products
 * @requires module:./ProductCard.jsx Creates the Product Cards to display on the screen
 * @param {string} showOwnerButtons Whether to show the owner's edit/delete buttons or the buy button; passed into ProductCard
 * @exports DisplayProducts The Product card with the product's information, etc.
 */
import { VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import ProductCard from "./ProductCard.jsx";
import { useProductsStore } from "../../store/products_store.js";

const DisplayProducts = ({showOwnerButtons}) =>
{
    /** If on the Manage Products Page (Owner only page), then show all products.  Otherwise, only show the products in the store. */
    let getURL = "";
    if (showOwnerButtons === "yes")
    {
        getURL = "/api/products";
    }
    else
    {
        getURL = "/api/products?inStore=yes"
    }
    /** Make a copy of products store based on the contents of the database so that filtering can be done. */
    const { getProductsCopy, productsCopy } = useProductsStore();
    useEffect(() => {
        getProductsCopy(getURL);
    }, [getProductsCopy]);
    console.log("Creating copy of Products Store based on database contents");
    /** Use the Products Store to get all of the Products for sale */
    const { getProducts, products } = useProductsStore();
    useEffect(() =>
    {
        getProducts(getURL);
    }, [getProducts]);
    console.log("retrieved All Products from database");

    return(
        <>
            
            <VStack>
                <SimpleGrid
                    columns={{ base:1, md:2, lg:3 }}
                    spacing={10}
                    w={"full"}
                >
                    {/** For each product in products, mark the _id as its key and pass each product into ProductCard. */
                        products.map((product) => (
                        <ProductCard key={product._id} product={product} showOwnerButtons={showOwnerButtons} />
                    ))}
                </SimpleGrid>

                {/** Display no Products in inventory */
                products.length === 0 && (
                    <Text
                        textAlign={"left"}
                        fontWeight={"bold"}
                        color={"green.100"}
                        fontSize={"lg"}
                        aria-label="large-ish Text that says No Products in very pale green font"
                    >
                        No Products
                    </Text>
                )}
            </VStack>
        </>
    );
}

export default DisplayProducts;