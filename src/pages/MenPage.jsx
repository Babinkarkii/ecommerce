import { Container, Grid, Title } from "@mantine/core";
import React from "react";
import { menProducts } from "../mock/mock";
import ProductCard from "../components/Card/ProductCard";

const MenPage = () => {
  return (
    <Container size="xl" my="80">
      <Title order={1} align="center" mb="md">
        Mens Collection
      </Title>
      <Grid my={80}>
        {menProducts.map((item) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={item.id}>
            <ProductCard item={item} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default MenPage;
