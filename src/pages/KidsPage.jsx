import { Container, Grid, Title } from "@mantine/core";
import React from "react";
import { kidsProducts } from "../mock/mock";
import ProductCard from "../components/Card/ProductCard";

const KidsPage = () => {
  return (
    <Container size="xl" my="80">
      <Title order={1} align="center" mb="md">
        Kids Collection
      </Title>
      <Grid my={80}>
        {kidsProducts.map((item) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={item.id}>
            <ProductCard item={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default KidsPage;
