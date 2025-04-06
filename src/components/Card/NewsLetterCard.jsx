import {
  Box,
  Button,
  Card,
  Group,
  Input,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

const NewsLetterCard = () => {
  return (
    <Card withBorder my={80}>
      <Stack justify="center" align="center" h={400} w={"100%"} gap={0}>
        <Title order={3} ta={"center"}>
          Follow the latest trends
        </Title>
        <Text fz={"lg"} ta={"center"} c={"#757575"} mb={32}>
        With our daily newsletter
        </Text>
        <Group gap={"lg"} justify="center" w={"100%"}>
          <Input
            placeholder="you@example.com"
            type="email"
            size="md"
            radius={"sm"}
            w={300}
          />
          <Button radius={"sm"} size="md" variant="filled" color="dark">
            Submit
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default NewsLetterCard;
