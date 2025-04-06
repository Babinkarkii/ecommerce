import { Grid } from "@mantine/core";
import ProductCard from "./Card/ProductCard";

export default function ProductGrid({ products }) {
  return (
    <Grid gutter={"lg"}>
      {products.map((product) => (
        <Grid.Col span={{ base: 12, xs: 6, md:4 }} key={product.id}>
          <ProductCard key={product.id} item={product} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
