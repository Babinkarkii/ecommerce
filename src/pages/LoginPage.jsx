import React, { useState } from "react";
import {
  Container,
  TextInput,
  Button,
  PasswordInput,
  Group,
  Stack,
  Text,
  Card,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../auth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = authenticate(username, password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container size={"xs"} mt={120} mb={80}>
      <Group justify="center" align="center" grow>
        <Stack
          justify="center"
          align="center"
          w={"100%"}
          h={"calc(100vh - 250px)"}
        >
          <Text fz={"lg"} fw={600} ta={"center"} mb={32}>
            Enter Your Email To Sign In
          </Text>
          <Card withBorder w={"400px"} shadow="sm" padding="lg" radius="md">
            <Stack gap={"lg"}>
              <TextInput
                label="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to={"#"} style={{ textDecoration: "none", color: "black" }}>
                Forget Password?
              </Link>
              <Button color="dark" onClick={handleLogin}>
                Login
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Group>
    </Container>
  );
};

export default LoginPage;
