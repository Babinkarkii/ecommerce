import { Box, Container, Grid, Text } from "@mantine/core";
import React from "react";
import ProductDetailCard from "../components/Card/ProductDetailCard";
import { cartData } from "../mock/mock";
import ProductCard from "../components/Card/ProductCard";

const SuggestedProductPage = () => {
  const item = cartData[1];
  return (
    <Container size={"xl"} mt={120} mb={80}>
      <ProductDetailCard item={item} />
      <Box my={80}>
        <Text ta={"center"} fz={"xl"} fw={600} my={80}>
          Other Items
        </Text>
        <Grid>
          {cartData.map((item, index) => (
            <Grid.Col span={{ sm: 4, xs: 6, base: 12 }} key={index}>
              <ProductCard item={item} />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SuggestedProductPage;
