import React, { useState } from "react";
import {
  Container,
  TextInput,
  Button,
  Stack,
  Card,
  Group,
  Center,
  Image,
  Box,
  Select,
  NumberInput,
  Textarea,
  Divider,
  Title,
  Text,
} from "@mantine/core";

const AddProductPage = () => {
  const [status, setStatus] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [productDescription, setProductDescription] = useState("");

  // Mock Data for Categories and Companies
  const categories = [
    { value: "men", label: "Men's" },
    { value: "women", label: "Women's" },
    { value: "kids", label: "Kids" },
    { value: "electronics", label: "Electronics" },
  ];

  const companies = [
    { value: "company_a", label: "Company A" },
    { value: "company_b", label: "Company B" },
    { value: "company_c", label: "Company C" },
  ];

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "black", label: "Black" },
  ];

  const sizeOptions = [
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];

  const handleAddProduct = () => {
    // Simulate adding a product to the database or state
    setStatus(true);
    alert(
      `Product ${productName} added with price ${productPrice}, Category: ${category}, Company: ${company}`
    );

    // Reset form fields after adding
    setProductName("");
    setProductPrice("");
    setColors([]);
    setSizes([]);
    setQuantity(1);
    setCategory("");
    setCompany("");
    setProductDescription("");
  };

  return (
    <Container size="xl" mt={80} mb={80}>
      <Group position="apart" mb={40}>
        {/* Product Image Card */}
        <Card withBorder w={"40%"} shadow="lg" p={0} radius="md">
          <Box style={{ borderRadius: "md", overflow: "hidden" }}>
            <Image
              src={
                "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D"
              }
              alt="Product"
              radius="md"
              fit="cover"
              h={350}
            />
          </Box>
        </Card>

        {/* Product Details Form */}
        <Card withBorder w={"55%"} shadow="lg" p={"xl"} radius="md">
          <Title order={3} mb={20} align="center">
            Add Product Details
          </Title>
          <Stack spacing="lg">
            <TextInput
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              w="100%"
            />
            <TextInput
              label="Product Price (USD)"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter product price"
              w="100%"
            />
            <Textarea
              label="Product Description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Write a brief description of the product"
              w="100%"
              minRows={4}
            />
            <Select
              label="Select Category"
              value={category}
              onChange={setCategory}
              data={categories}
              placeholder="Choose a category"
              w="100%"
            />
            <Select
              label="Select Company"
              value={company}
              onChange={setCompany}
              data={companies}
              placeholder="Choose a company"
              w="100%"
            />
            <Select
              label="Select Colors"
              value={colors}
              onChange={setColors}
              data={colorOptions}
              placeholder="Choose color(s)"
              w="100%"
              multiple
            />
            <Select
              label="Select Size(s)"
              value={sizes}
              onChange={setSizes}
              data={sizeOptions}
              placeholder="Choose size(s)"
              w="100%"
              multiple
            />
            <NumberInput
              label="Quantity"
              value={quantity}
              onChange={setQuantity}
              min={1}
              placeholder="Enter quantity"
              w="100%"
            />
            {status && (
              <Button
                onClick={handleAddProduct}
                fullWidth
                size="lg"
                color="green"
                disabled
              >
                Product added successfully!
              </Button>
            )}
            {!status && (
              <Button
                onClick={handleAddProduct}
                fullWidth
                size="lg"
                color="dark"
              >
                Add Product
              </Button>
            )}
          </Stack>
        </Card>
      </Group>

      {/* Divider to separate content */}
      <Divider my="lg" />
    </Container>
  );
};

export default AddProductPage;
