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
import { admin } from "../mock/mock";

const AdminDashboard = () => {
  
  return (
    <Container size={"xl"} mt={120} mb={80}>
      <DashboardComponent item={admin} />
      <Group justify="center" my={80}>
        <Link
          to={"/admin/add-product"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Text fz={"xl"} fw={"600"} c={"dark"}>
            Add Products for Sale{" "}
            <IconArrowRight size={20} style={{ paddingTop: "2px" ,marginLeft:"8px" }} />
          </Text>
        </Link>
      </Group>
    </Container>
  );
};

export default AdminDashboard;
