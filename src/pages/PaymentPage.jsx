import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { paymentOptions } from "../mock/mock";

const PaymentPage = () => {
  return (
    <Container size="xl" my="80">
      <Title order={1} align="center" mb="md">
        Choose Payment Method
      </Title>
      <Box my={80}>
        <Grid>
          {paymentOptions.map((item) => (
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Card
                withBorder
                radius={"md"}
                p={20}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                key={item.id}
                shadow="sm"
                sx={{
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                }}
              >
                <Group>
                  <Title order={3}>{item.name}</Title>
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Text>{item.description}</Text>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PaymentPage;
