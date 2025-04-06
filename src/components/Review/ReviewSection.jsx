import {
  Avatar,
  Box,
  Card,
  Grid,
  Group,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { reviews } from "../../mock/mock";

const ReviewSection = () => {
  return (
    <Box my={80}>
      <Title order={2} mb={"60"}>
        Latest Reviews
      </Title>
      <Grid>
        {reviews.map((review) => (
          <Grid.Col span={{ base: 12, xs: 6, sm: 4 }} key={review.id}>
            <Card withBorder py={"md"} px={"lg"}>
              <Rating readOnly value={review.rating} mb={"lg"} />
              <Title order={3} mb={"xs"} lh={0.8}>
                {review.title}
              </Title>
              <Text fz={"sm"}>{review.description}</Text>
              <Group mt={"lg"}>
                <Avatar src={review.avatar} size={"md"} />
                <Stack gap={3}>
                  <Text fw={500} fz={"sm"}>
                    {review.reviewBy}
                  </Text>
                  <Text c={"#B3B3B3"} fz={"sm"}>
                    {review.date}
                  </Text>
                </Stack>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default ReviewSection;
