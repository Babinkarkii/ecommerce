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

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Save user data in localStorage (for demo purposes)
    const userData = { username, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect to the user page after signup
    navigate("/user");
  };

  return (
    <Container size={"xs"} mt={120} mb={80}>
      <Group justify="center" align="center" grow>
        <Stack
          justify="center"
          align="center"
          w={"100%"}
          h={"calc(100vh - 180px)"}
        >
          <Text fz={"lg"} fw={600} ta={"center"} mb={32}>
            Create Your Account
          </Text>
          <Card withBorder w={"400px"} shadow="sm" padding="lg" radius="md">
            <Stack gap={"lg"}>
              {/* Display error message if any */}
              {errorMessage && (
                <Text color="red" align="center" mb={16}>
                  {errorMessage}
                </Text>
              )}

              <TextInput
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordInput
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button color="dark" onClick={handleSignup}>
                Signup
              </Button>
            </Stack>
          </Card>
          <Text align="center" mt={16}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
              Login here
            </Link>
          </Text>
        </Stack>
      </Group>
    </Container>
  );
};

export default SignupPage;
