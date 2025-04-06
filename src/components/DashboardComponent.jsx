import { Box, Divider, Stack, Text, Title } from "@mantine/core";
import React from "react";

const DashboardComponent = ({item}) => {
  return (
    <div>
      <Title ta={"center"} order={1}>
        {item.role} Dashboard
      </Title>
      <Box my={80}>
        <Text fz={"lg"} c={"#757575"}>
          User Profile
        </Text>
        <Text fz={"lg"} fw={600} c={"dark"}>
          {item.name}
        </Text>
      </Box>
      <Divider my={80} />
      <Stack gap={"lg"}>
        <Box>
          <Text fz={"lg"} c={"dark"}>
            {item.name}
          </Text>
          <Text fz={"sm"} c={"#757575"}>
            Name
          </Text>
        </Box>
        <Box>
          <Text fz={"lg"} c={"dark"}>
            Age: {item.age}
          </Text>
          <Text fz={"sm"} c={"#757575"}>
            Menu description
          </Text>
        </Box>
        <Box>
          <Text fz={"lg"} c={"dark"}>
            {item.date}
          </Text>
          <Text fz={"sm"} c={"#757575"}>
            Date-of-Birth
          </Text>
        </Box>
      </Stack>
      <Divider my={80} />
    </div>
  );
};

export default DashboardComponent;
