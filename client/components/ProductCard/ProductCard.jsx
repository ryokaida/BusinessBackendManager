"use client"

/**
 * This file contains Product Cards that will be displayed on the Store Page and the Manage Products Page.
 * The Product Cards appear for non-authenticated users on the Store Page and for owners on the Manage Products Page.
 * 
 * This page incorporates the module {@link module:./ProductCardInfoText.jsx} to display the product's information.
 * This page incorporates the module {@link module:./EditAndDeleteButtons.jsx} so that the owner can edit and delete products.
 * This page incorporates the module {@link module:"./BuyButton.jsx} so that non-authenticated users can buy products.
 * 
 * @module ProductCard
 * @requires module:./ProductCardInfoText.jsx Creates the information text about the product being displayed
 * @requires module:./EditAndDeleteButtons.jsx The Edit Product and Delete Product buttons that appear only for the owner
 * @requires module:"./BuyButton.jsx The Buy button that appears only for non-authenticated users
 * @param {Object} product The product to  be displayed on the card
 * @param {string} showOwnerButtons Whether to show the owner's edit/delete buttons or the buy button; "yes" - show owner's edit/delete buttons; "no" - show buy button
 * @exports ProductCard The Product card with the product's information, etc.
 */
import BuyButton from "./BuyButton.jsx";;
import { Box, Heading, HStack, Container, Image } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import EditAndDeleteButtons from "./EditAndDeleteButtons.jsx";
import ProductCardInfoText from "./ProductCardInfoText.jsx";

const ProductCard = ({product, showOwnerButtons}) => {
    return(
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 03.s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            mb={4}
            bg={"green.600"}
            maxWidth={"lg"}
            aria-label="box that displays the product and its info.  the background is medium green."
        >
            <Box p={4}>
                <HStack spacing={4}>
                    <Container>
                        <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
                        <Box p={1}>
                            <Heading
                                as="h2"
                                size="2xl"
                                mb={2}
                                color={"black"}
                                aria-label={"Dialog header that says " + product.name + "in black font, and it is underlined"}
                            >
                                <u>{product.name}</u>
                            </Heading>
                            
                            {/** Show the Product information. */}
                            <ProductCardInfoText data={product.price} InfoTextName={"Price"} />
                            <ProductCardInfoText data={product.description} InfoTextName={"Description"} />
                            <ProductCardInfoText data={product.qtyInStock} InfoTextName={"Quantity"} />
                            <ProductCardInfoText data={product.advertisingPlatforms} InfoTextName={"Advertising Platforms"} />
                            <ProductCardInfoText data={product.tags} InfoTextName={"Tags"} />
                        </Box>
                    </Container>
                    
                    {/* Show the Edit and Delete Buttons, and pass the current product into the component. */}
                    

                    {/* Show the Buy button */}

                    { showOwnerButtons === "yes" ? <EditAndDeleteButtons product={product} /> : <BuyButton product={product} /> }
                </HStack>
            </Box>
        </Box>
    );
}

export default ProductCard;