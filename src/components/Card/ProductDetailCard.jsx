import {
  Button,
  Card,
  Grid,
  Group,
  Image,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React, { useState } from "react";

const ProductDetailCard = ({ item }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "black", label: "Black" },
  ];

  // Size options
  const sizeOptions = [
    { value: "s", label: "Small" },
    { value: "m", label: "Medium" },
    { value: "l", label: "Large" },
    { value: "xl", label: "Extra Large" },
  ];
  return (
    <Card shadow="sm" p={"0"} style={{ marginBottom: "20px" }} my={"80"}>
      <Grid gutter={"lg"}>
        <Grid.Col span={{ md: 5, base: 12 }}>
          <Image
            src={item.image}
            alt={item.title}
            radius="md"
            style={{ width: "100%", height: "350px", objectFit: "cover" }}
          />
        </Grid.Col>
        <Grid.Col
          span={{ md: 7, base: 12 }}
          px={{ base: "md", md: "60" }}
          py={"lg"}
        >
          <Stack justify="space-between" style={{ height: "100%" }}>
            <div>
              <Title order={4} mb={"xs"}>
                {item.name}
              </Title>
              <Text fz="24" fw={600} mb="md">
                {item.price} USD
              </Text>
              <Text fz="xl" weight={700} mb="md">
                {item.content}
              </Text>
            </div>
            <Group gap="md">
              {/* Color Select Dropdown */}
              <Select
                label="Select Color"
                value={selectedColor}
                onChange={setSelectedColor}
                data={colorOptions}
                placeholder="Choose a color"
                clearable
                style={{ width: "300px" }}
              />
              {/* Size Select Dropdown */}
              <Select
                label="Select Size"
                value={selectedSize}
                onChange={setSelectedSize}
                data={sizeOptions}
                placeholder="Choose a size"
                clearable
                style={{ width: "300px" }}
              />
            </Group>
            <Button variant="filled" color="#2C2C2C" my={"sm"} size="md">
              Add to Cart
            </Button>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default ProductDetailCard;
