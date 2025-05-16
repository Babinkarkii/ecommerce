import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Button,
  Divider,
  Stack,
  Center,
  Avatar
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { paymentOptions } from "../mock/mock";
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconUser, IconMapPin } from '@tabler/icons-react';

const PaymentPage = () => {
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("123 Main St, Mumbai, India");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get cart total
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
      setCartTotal(total);
    }
    // Get shipping address from localStorage (if you want to persist it), else use demo
    // For now, use demo data
    // Get user info
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`http://localhost:5000/api/auth/user/${userId}`)
        .then(async res => {
          const data = await res.json();
          if (res.ok && data.username) {
            setUserName(data.username);
            setUserEmail(data.email);
          }
        })
        .catch(() => {
          setUserName("");
          setUserEmail("");
        });
    }
    // Optionally, get shipping address from localStorage if you store it
    const storedShipping = localStorage.getItem('shippingAddress');
    if (storedShipping) setShippingAddress(storedShipping);
  }, []);

  const handleSelect = (id) => {
    setSelected(id);
    setSuccess(false);
  };

  const handleConfirm = () => {
    if (selected) {
      setSuccess(true);
      const method = paymentOptions.find(opt => opt.id === selected);
      showNotification({
        title: 'Payment Successful',
        message: `You paid with ${method.title}. Thank you for your purchase!`,
        color: 'green',
      });
      // Clear cart after payment
      localStorage.removeItem('cart');
    }
  };

  return (
    <Container size="xl" my="80" style={{ background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)", borderRadius: 16, padding: 32 }}>
      {success && (
        <Center mb={40}>
          <Card shadow="xl" p="xl" radius="lg" withBorder style={{ background: '#e6fcf5', border: '2px solid #51cf66', minWidth: 350, maxWidth: 500 }}>
            <Stack align="center" spacing={12}>
              <Avatar color="green" radius={100} size={80}><IconCheck size={48} /></Avatar>
              <Title order={2} color="green">Payment Successful!</Title>
              <Text color="dimmed" size="lg">Thank you for your purchase.</Text>
            </Stack>
          </Card>
        </Center>
      )}
      {!success && (
        <>
          <Title order={1} align="center" mb="md" style={{ letterSpacing: 1 }}>
            Choose Payment Method
          </Title>
          <Grid gutter={40} align="flex-start">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Grid gutter={32}>
                {paymentOptions.map((item) => (
                  <Grid.Col span={{ base: 12, sm: 6 }} key={item.id}>
                    <Card
                      withBorder
                      radius={"lg"}
                      p={28}
                      style={{
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        border: selected === item.id ? '2.5px solid #228be6' : '1.5px solid #e0e7ff',
                        background: selected === item.id ? '#e7f5ff' : '#fff',
                        boxShadow: selected === item.id ? '0 4px 24px #228be622' : '0 2px 8px #e0e7ff44',
                        position: 'relative',
                      }}
                      shadow={selected === item.id ? "xl" : "sm"}
                      onClick={() => handleSelect(item.id)}
                    >
                      <Stack align="center" spacing={8}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          style={{ width: "80px", height: "80px", borderRadius: 16, marginBottom: 8 }}
                        />
                        <Title order={3} mb={4} style={{ fontWeight: 700 }}>{item.title}</Title>
                        <Text color="dimmed" align="center">{item.description}</Text>
                      </Stack>
                      {selected === item.id && (
                        <Center style={{ position: 'absolute', top: 16, right: 16 }}>
                          <Avatar color="green" radius="xl" size={32}><IconCheck size={20} /></Avatar>
                        </Center>
                      )}
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
              <Group position="center" mt={40}>
                <Button
                  color="dark"
                  size="lg"
                  disabled={!selected}
                  onClick={handleConfirm}
                  style={{ minWidth: 200, fontWeight: 600, fontSize: 18 }}
                >
                  Confirm Payment
                </Button>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card shadow="xl" p="xl" radius="lg" withBorder style={{ background: "#f1f5f9" }}>
                <Title order={3} mb={16}>Order Summary</Title>
                <Divider mb={16} />
                <Stack spacing={8}>
                  <Group spacing={8} align="center">
                    <Avatar color="indigo" radius="xl" size={32}><IconUser size={18} /></Avatar>
                    <Text fw={600}>{userName}</Text>
                  </Group>
                  <Text color="dimmed" fz="sm">{userEmail}</Text>
                  <Divider my={8} />
                  <Group spacing={8} align="center">
                    <IconMapPin size={18} color="#6366f1" />
                    <Text fz="md">{shippingAddress}</Text>
                  </Group>
                  <Divider my={8} />
                  <Text size="lg">Total: <b>{cartTotal} AUD</b></Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default PaymentPage;
