import React from "react";
import {
  Box,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconArrowRight } from "@tabler/icons-react";
import DashboardComponent from "../components/DashboardComponent";
import { user } from "../mock/mock";

const UserDashboard = () => {
  return (
    <Container size={"xl"} mt={120} mb={80}>
      <DashboardComponent item={user} />
      
    </Container>
  );
};

export default UserDashboard;
