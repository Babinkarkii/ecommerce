import React, { useState } from "react";
import {
  Container, TextInput, Button, Stack, Card, Select, NumberInput, Textarea, Title, Notification
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const categories = [
  { value: "men", label: "Men's" },
  { value: "women", label: "Women's" },
  { value: "kids", label: "Kids" },
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
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

// Helper to ensure value is always an array
const safeArray = (val) => Array.isArray(val) ? val : (val ? [val] : []);

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);

  const handleAddProduct = async () => {
    setError("");
    setSuccess(false);
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("category", category);
    formData.append("company", company);
    formData.append("colors", safeArray(colors).join(","));
    formData.append("sizes", safeArray(sizes).join(","));
    formData.append("quantity", quantity);
    if (image) {
      formData.append("image", image);
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "x-user-id": localStorage.getItem("userId"),
        },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setProductName("");
        setProductPrice("");
        setColors([]);
        setSizes([]);
        setQuantity(1);
        setCategory("");
        setCompany("");
        setProductDescription("");
        setImage(null);
      } else {
        setError(data.message || "Failed to add product");
      }
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <Container size="sm" mt={80} mb={80}>
      <Title order={2} align="center" mb={32}>Add New Product</Title>
      {success && (
        <Notification icon={<IconCheck size={18} />} color="green" mb={16}>
          Product added successfully!
        </Notification>
      )}
      {error && (
        <Notification color="red" mb={16}>
          {error}
        </Notification>
      )}
      <Card withBorder shadow="md" p="xl" radius="md">
        <Stack spacing="lg">
          <TextInput
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
          <TextInput
            label="Product Price (USD)"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Enter product price"
            required
          />
          <Textarea
            label="Product Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Write a brief description of the product"
            minRows={3}
          />
          <Select
            label="Select Category"
            value={category}
            onChange={setCategory}
            data={categories}
            placeholder="Choose a category"
            required
          />
          <Select
            label="Select Company"
            value={company}
            onChange={setCompany}
            data={companies}
            placeholder="Choose a company"
            required
          />
          <Select
            label="Select Colors"
            value={colors}
            onChange={setColors}
            data={colorOptions}
            placeholder="Choose color(s)"
            multiple
          />
          <Select
            label="Select Size(s)"
            value={sizes}
            onChange={setSizes}
            data={sizeOptions}
            placeholder="Choose size(s)"
            multiple
          />
          <NumberInput
            label="Quantity"
            value={quantity}
            onChange={setQuantity}
            min={1}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files[0])}
            style={{ marginBottom: 16 }}
          />
          <Button color="dark" onClick={handleAddProduct} fullWidth size="lg">
            Add Product
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default AddProductPage;