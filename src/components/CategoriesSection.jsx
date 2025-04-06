import { Text, Grid, Image, Title, Card } from "@mantine/core";
import React from "react";
import ProductCard from "./Card/ProductCard";

const CategoriesSection = ({ data }) => {

  return (
    <>
      <Grid>
        {data.map((item, index) => (
          <Grid.Col span={{ sm: 4, xs: 6, base: 12 }} key={index}>
            {item.title && (
              <Title order={4} mb="xs" ta={"center"} tt={"uppercase"}>
                {item.title}
              </Title>
            )}
            <ProductCard item={item} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default CategoriesSection;
