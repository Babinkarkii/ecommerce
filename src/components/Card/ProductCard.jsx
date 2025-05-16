import { Card, Image, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
    console.log(item);
  const navigate = useNavigate();

  return (
    <Card
      h={"450px"}
      withBorder
      p={0}
      radius={"lg"}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <Image
        src={item.image}
        alt={item.name}
        height={item.price ? 365 : "100%"}
        fit="cover"
      />
      {item.price && (
        <Text order={5} align="center" mt="xs">
          {item.price}
        </Text>
      )}
      {item.price && (
        <Text order={5} align="center" mt="xs">
          {item.name}
        </Text>
      )}
    </Card>
  );
};

export default ProductCard;
