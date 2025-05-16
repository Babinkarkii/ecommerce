import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Loader, Center, Title } from "@mantine/core";
import ReviewSection from "../components/Review/ReviewSection";
import ProductDetailCard from "../components/Card/ProductDetailCard";
import NewsLetterCard from "../components/Card/NewsLetterCard";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/products`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => String(p.id) === String(id));
        if (found) setProduct(found);
        else setError("Product not found");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Center mt={120}><Loader size="lg" /></Center>;
  if (error) return <Center mt={120}><Title color="red">{error}</Title></Center>;

  return (
    <Container size={"xl"} mt={120} mb={80}>
      <ProductDetailCard item={product} />
      <ReviewSection />
      <NewsLetterCard />
    </Container>
  );
};

export default ProductPage;
