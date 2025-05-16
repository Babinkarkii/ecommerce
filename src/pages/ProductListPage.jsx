import { Box, Button, Container, Grid, Group, Input, Title, Loader, Center } from "@mantine/core";
import React, { useState, useEffect } from "react";
import FilterSidebar from "../components/FilterSidebar";
import ProductGrid from "../components/ProductGrid";

const ProductListPage = () => {
  const [filters, setFilters] = useState({
    category: [],
    price: 100,
    color: [],
    size: [],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  const filtered = products.filter((p) => {
    return (
      (filters.category.length === 0 ||
        filters.category.includes(p.category)) &&
      p.price <= filters.price &&
      (filters.color.length === 0 || filters.color.includes(p.color)) &&
      (filters.size.length === 0 ||
        filters.size.some((size) => p.size && p.size.includes(parseFloat(size)))
      )
    );
  });

  const menProducts = filtered.filter(p => p.category === 'men');
  const womenProducts = filtered.filter(p => p.category === 'women');
  const kidsProducts = filtered.filter(p => p.category === 'kids');

  if (loading) return <Center mt={120}><Loader size="lg" /></Center>;
  if (error) return <Center mt={120}><Title color="red">{error}</Title></Center>;

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
          <Title order={2} mt={32} mb={8}>Men's Shoes</Title>
          <ProductGrid products={menProducts} />
          <Title order={2} mt={32} mb={8}>Women's Shoes</Title>
          <ProductGrid products={womenProducts} />
          <Title order={2} mt={32} mb={8}>Kids' Shoes</Title>
          <ProductGrid products={kidsProducts} />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ProductListPage;
