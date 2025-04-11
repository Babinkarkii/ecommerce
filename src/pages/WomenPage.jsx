import { Container, Grid, Title } from "@mantine/core";
import React from "react";
import { womenProducts } from "../mock/mock";
import ProductCard from "../components/Card/ProductCard";

const WomenPage = () => {
  return (
    <Container size="xl" my="80">
      <Title order={1} align="center" mb="md">
        Womens Collection
      </Title>
      <Grid my={80}>
        {womenProducts.map((item) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={item.id}>
            <ProductCard item={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default WomenPage;
