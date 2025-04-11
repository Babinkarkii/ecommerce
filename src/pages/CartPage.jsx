import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  Group,
} from "@mantine/core";
import React from "react";
import { cartData } from "../mock/mock";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const router=useNavigate();

  const handleNavigate = () => {
    router("/payment");
  }

  return (
    <Container size="xl" my="80">
      {cartData.map((item) => (
        <Card
          key={item.id}
          shadow="sm"
          padding="lg"
          style={{ marginBottom: "20px" }}
          my={"80"}
        >
          <Grid gutter={"lg"} align="center">
            <Grid.Col span={{ md: 5, base: 12 }}>
              <Image
                src={item.image}
                alt={item.title}
                radius="md"
                style={{ width: "100%", height: "350px", objectFit: "cover" }}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 7, base: 12 }}>
              <Stack justify="space-between" style={{ height: "100%" }}>
                <div>
                  <Title order={3}>{item.name}</Title>
                  <Text size="lg" c="dimmed" mb="md">
                    {item.description}
                  </Text>
                  <Text size="xl" weight={700} mb="md">
                    {item.price} USD
                  </Text>
                </div>
                <Group position="apart">
                  <Button variant="outline" color="red" size="md" onClick={handleNavigate}>
                    Buy Now
                  </Button>
                  <Button variant="subtle" color="gray" size="sm">
                    Remove
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      ))}
      <Card withBorder>
        <Stack justify="center" align="center" gap={"sm"} h={"100%"} my={80}>
          <Text fz={"26"} fw={"700"} ta={"center"} lh={0.9}>
            Buy Together ?
          </Text>
          <Text fz={"20"} ta={"center"} c={"#757575"}>
            Press Buy To Purchase
          </Text>
          <Button variant="outline" mt={"xs"} color="red" size="lg">
            Buy Now
          </Button>
        </Stack>
      </Card>
    </Container>
  );
};

export default CartPage;
