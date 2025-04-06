import { Box, Button, Container, Grid, Group, Input } from "@mantine/core";
import React, { useState } from "react";
import { products } from "../mock/mock";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";

const ProductListPage = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: 100,
    color: [],
    size: [],
  });

  const filtered = products.filter((p) => {
    return (
      (filters.category.length === 0 ||
        filters.category.includes(p.category)) &&
      p.price <= filters.price &&
      (filters.color.length === 0 || filters.color.includes(p.color)) &&
      (filters.size.length === 0 ||
        filters.size.some((size) => p.size.includes(parseFloat(size))))
    );
  });

  return (
    <Container size="xl" mt={120} mb={80}>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Box w={250}>
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 9 }}>
          <Group mb="md">
            <Input placeholder="Search" />
            <Button variant="default">New</Button>
            <Button variant="outline">Price ↑</Button>
            <Button variant="outline">Price ↓</Button>
            <Button variant="outline">Rating</Button>
          </Group>
          <ProductGrid products={filtered} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductListPage;
