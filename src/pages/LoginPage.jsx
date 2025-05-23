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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage(""); // Clear previous errors
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.user && data.user.id) {
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userRole', data.user.role);
        navigate("/profile");
      } else {
        setErrorMessage(data.message || "Invalid credentials");
      }
    } catch (err) {
      setErrorMessage("Login failed");
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
              {errorMessage && (
                <Text color="red" align="center" mb={16}>
                  {errorMessage}
                </Text>
              )}
              <TextInput
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
