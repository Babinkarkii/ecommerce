import React from "react";
import {
  Container,
  Grid,
  Title,
  Text,
  Box,
  Image,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { homeSectionData } from "../mock/mock";
import CategoriesSection from "../components/CategoriesSection";

const HomePage = () => {
  return (
    <>
      <Container size="lg" my="120">
        <Grid gutter="xs" w={"100%"} justify="center">
          <Grid.Col span={{ base: 12, sm: 4 }} md={4}>
            <Title
              order={4}
              mb="xs"
              ta={"center"}
              tt={"uppercase"}
              style={{ cursor: "pointer" }}
            >
              Men's
            </Title>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }} md={4}>
            <Title
              order={4}
              mb="xs"
              ta={"center"}
              tt={"uppercase"}
              style={{ cursor: "pointer" }}
            >
              Women's
            </Title>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }} md={4}>
            <Title
              order={4}
              mb="xs"
              align="center"
              tt={"uppercase"}
              style={{ cursor: "pointer" }}
            >
              Kid's
            </Title>
          </Grid.Col>
        </Grid>
      </Container>
      <Box py={"120"} bg={"gray.1"} my={"120"}>
        <Text fz={"42"} fw={"700"} ta={"center"}>
          Discover Your Perfect Style
        </Text>
        <Text fz={"28"} ta={"center"} c={"#757575"}>
          Explore our exclusive collection tailored just for you.
        </Text>
      </Box>
      <Container size={"xl"} px={0} bg={"gray.1"} my={"80"}>
        <Image
          h={"400"}
          w={"100%"}
          src={
            "https://s3-alpha-sig.figma.com/img/1d02/4013/8f0615d0639c5f8fa595338126a13e6a?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Rei6tJL1kGdZ4va2lTFE9xSj3n82PGhgvswJFQv~F-eK4cFS6lmrEC2GsvAioBtQ3Cbrg2sq0ZD0i4Ygwhsv5sfr4u0VWSOe6bhVDEpzcnlHUDlq8ZiWhzjRfs40JlQRjIbEqBckOZy7n7HZqk3kzx~NH9x3zBhNVrpdS~EoNKDdhsLGHm7mC2Yc42gz8INAvxEusiOP6KpzSbZRJ3NRcFoQ~P1phWsqHeQkE75tmz8uz7HHkr~VKHELIz9U06YFiFSZg2uFUt2HsEagFCPuOjgG5hwJ8rx1TZN5T22dMWZ0NSDIO11cg~rbE6dO5qMF~Pnj8mD7H8Z60TGvl9Z6Ew__"
          }
          alt="Product Image"
          radius="md"
          fit="fill"
        />
      </Container>
      {homeSectionData.map((section) => (
        <Container size={"xl"} my={"120"} key={section.id}>
          <Title order={3} mb="xl" ta={"left"}>
            {section.title}
          </Title>
          <CategoriesSection data={section.content} />
        </Container>
      ))}
    </>
  );
};

export default HomePage;
