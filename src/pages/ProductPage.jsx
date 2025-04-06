import React from "react";
import { Container } from "@mantine/core";
import { cartData } from "../mock/mock";
import ReviewSection from "../components/Review/ReviewSection";
import ProductDetailCard from "../components/Card/ProductDetailCard";
import NewsLetterCard from "../components/Card/NewsLetterCard";

const ProductPage = () => {
  const item = cartData[0];

  return (
    <Container size={"xl"} mt={120} mb={80}>
      <ProductDetailCard item={item} />
      <ReviewSection />
      <NewsLetterCard />
    </Container>
  );
};

export default ProductPage;
