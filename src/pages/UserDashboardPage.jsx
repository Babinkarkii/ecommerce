import React, { useEffect, useState } from "react";
import {
  Container, Text, Loader, Center, Card, Avatar, Group, Title, Button, Stack, Modal, TextInput, PasswordInput, Divider, ActionIcon
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconUser, IconMail, IconId, IconEdit, IconHistory, IconLock } from "@tabler/icons-react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editError, setEditError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate("/login");
      return;
    }
    fetch(`http://localhost:5000/api/auth/user/${userId}`)
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "User not found or server error");
        }
        setUser({
          role: "User",
          name: data.username,
          email: data.email,
        });
        setEditName(data.username);
        setEditEmail(data.email);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Could not load user data. Please log in again.");
        setLoading(false);
      });
  }, [navigate]);

  // Handlers for modals (UI only)
  const handleEditProfile = () => {
    if (!editName || !editEmail) {
      setEditError("Name and Email are required.");
      return;
    }
    setUser({ ...user, name: editName, email: editEmail });
    setEditModalOpen(false);
    setEditError("");
  };
  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setPasswordError("Both fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordModalOpen(false);
    setPasswordError("");
    setNewPassword("");
    setConfirmPassword("");
    // Show a notification or toast here in a real app
  };

  if (loading) {
    return (
      <Center style={{ minHeight: "50vh" }}>
        <Loader size="lg" />
        <Text ml="md">Loading...</Text>
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="xs" mt={120} mb={80}>
        <Text color="red" align="center">{error}</Text>
        <Text align="center" mt="md">
          <a href="/login">Go to Login</a>
        </Text>
      </Container>
    );
  }

  return (
    <Container size={"sm"} mt={60} mb={80}>
      <Card shadow="xl" padding="xl" radius="lg" withBorder style={{ background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)" }}>
        <Group position="center" mb="md">
          <Avatar size={110} radius={100} style={{ border: "4px solid #4f46e5" }} color="indigo">
            <IconUser size={70} />
          </Avatar>
        </Group>
        <Stack align="center" spacing={2} mb="md">
          <Title order={2}>{user.name}</Title>
          <Group spacing={6} align="center">
            <IconMail size={18} color="#6366f1" />
            <Text color="dimmed">{user.email}</Text>
          </Group>
          <Group spacing={6} align="center">
            <IconId size={18} color="#6366f1" />
            <Text color="gray" size="sm">Role: {user.role}</Text>
          </Group>
        </Stack>
        <Divider my="md" />
        <Group position="center" spacing={16} mt="md">
          <Button leftIcon={<IconEdit size={18} />} variant="outline" color="indigo" onClick={() => setEditModalOpen(true)}>
            Edit Profile
          </Button>
          <Button leftIcon={<IconLock size={18} />} variant="outline" color="teal" onClick={() => setPasswordModalOpen(true)}>
            Change Password
          </Button>
          <Button leftIcon={<IconHistory size={18} />} variant="outline" color="gray" onClick={() => navigate("/orders")}>Order History</Button>
        </Group>
        <Group position="center" mt="lg">
          <Button variant="light" color="red" onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}>Logout</Button>
        </Group>
      </Card>
      {/* Edit Profile Modal */}
      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Profile" centered>
        <Stack>
          {editError && <Text color="red">{editError}</Text>}
          <TextInput label="Name" value={editName} onChange={e => setEditName(e.target.value)} required />
          <TextInput label="Email" value={editEmail} onChange={e => setEditEmail(e.target.value)} required />
          <Button color="indigo" onClick={handleEditProfile}>Save</Button>
        </Stack>
      </Modal>
      {/* Change Password Modal */}
      <Modal opened={passwordModalOpen} onClose={() => setPasswordModalOpen(false)} title="Change Password" centered>
        <Stack>
          {passwordError && <Text color="red">{passwordError}</Text>}
          <PasswordInput label="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          <PasswordInput label="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          <Button color="teal" onClick={handleChangePassword}>Change Password</Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default ProfilePage;