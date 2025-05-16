import React, { useEffect, useState } from "react";
import {
  Group,
  Text,
  Button,
  AppShell,
  Input,
  Box,
  Container,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";

const AppHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <Container size="xl" my="120">
      <AppShell>
        <AppShell.Header height={60} p="xs">
          <Group justify="space-between" style={{ height: "100%" }}>
            <Group justify="space-between">
              <Text size="lg" weight={700}>
                Ecommerce App
              </Text>
              <Box pos={"relative"}>
                <Input
                  placeholder="Search"
                  style={{ width: "300px" }}
                  radius={"lg"}
                />
                <IconSearch
                  size={20}
                  c="dark"
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 10,
                  }}
                />
              </Box>
            </Group>
            <Group gap={40}>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </Link>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "black" }}
              >
                Cart
              </Link>
              <Link
                to="/productList"
                style={{ textDecoration: "none", color: "black" }}
              >
                Top Products
              </Link>
              <Link
                to="/suggested-products"
                style={{ textDecoration: "none", color: "black" }}
              >
                Suggested Products
              </Link>
            </Group>
            <Group gap={30}>
              {isLoggedIn ? (
                <>
                  <Button component={Link} to="/profile" variant="default">Profile</Button>
                  <Button
                    variant="outline"
                    color="dark"
                    size="md"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    LogOut
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button variant="filled" color="blue" size="md" mr={8}>
                      Login
                    </Button>
                  </Link>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button variant="filled" color="dark" size="md">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
              {!isAdmin && (
                <Link
                  to="/admin-login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button variant="outline" color="red" size="md">
                    Admin Login
                  </Button>
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button variant="outline" color="red" size="md">
                    Admin Dashboard
                  </Button>
                </Link>
              )}
            </Group>
          </Group>
        </AppShell.Header>
      </AppShell>
    </Container>
  );
};

export default AppHeader;
