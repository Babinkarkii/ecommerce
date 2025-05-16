import {
  Button,
  Card,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  Group,
  Paper,
  Divider,
  Center,
  Avatar,
  Modal,
  TextInput
} from "@mantine/core";
import { IconShoppingCart, IconTrash, IconUser, IconMapPin, IconEdit } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const router = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("123 Main St, Mumbai, India");
  const [billingAddress, setBillingAddress] = useState("123 Main St, Mumbai, India");
  const [editAddressType, setEditAddressType] = useState(null); // 'shipping' or 'billing'
  const [addressInput, setAddressInput] = useState("");
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [shippingContact, setShippingContact] = useState("+91 98765 43210"); // Placeholder contact

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      // Add a few sample products for demo
      const demoCart = [
        {
          id: 1,
          name: 'Nike Air Max',
          description: 'Comfortable running shoes',
          price: 120,
          image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=60',
        },
        {
          id: 2,
          name: 'Adidas Ultraboost',
          description: 'High performance sneakers',
          price: 150,
          image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop',
        },
        {
          id: 3,
          name: 'Puma Classic',
          description: 'Classic style everyday wear',
          price: 90,
          image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1974&auto=format&fit=crop',
        },
      ];
      localStorage.setItem('cart', JSON.stringify(demoCart));
      setCartItems(demoCart);
    }
    // Fetch user name/email from backend if logged in
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
  }, []);

  const handleNavigate = () => {
    router("/payment");
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Address modal handlers
  const openEditAddress = (type) => {
    setEditAddressType(type);
    setAddressInput(type === 'shipping' ? shippingAddress : billingAddress);
    setAddressModalOpen(true);
  };
  const saveAddress = () => {
    if (editAddressType === 'shipping') setShippingAddress(addressInput);
    if (editAddressType === 'billing') setBillingAddress(addressInput);
    setAddressModalOpen(false);
  };

  // Calculate total cost
  const totalCost = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <Container size="xl" my="80" style={{ background: "linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)", borderRadius: 16, padding: 32 }}>
      <Center mb={24}>
        <Group>
          <IconShoppingCart size={36} color="#2C2C2C" />
          <Title order={1} color="dark">Your Cart</Title>
        </Group>
      </Center>
      {(userName || userEmail) && (
        <Center mb={24}>
          <Group spacing={12}>
            <Avatar color="indigo" radius="xl" size={44}><IconUser size={28} /></Avatar>
            <Stack spacing={0}>
              <Text fw={700} fz="lg">{userName}</Text>
              <Text color="dimmed" fz="sm">{userEmail}</Text>
            </Stack>
          </Group>
        </Center>
      )}
      <Grid gutter={32} mb={32}>
        {/* Remove the shipping address card from here */}
      </Grid>
      <Divider my={24} />
      {cartItems.length === 0 ? (
        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Center>
            <Stack align="center" gap={8}>
              <IconShoppingCart size={64} color="#adb5bd" />
              <Title order={3} color="dimmed">Your cart is empty</Title>
              <Text color="dimmed">Add some products to see them here!</Text>
              <Button color="dark" mt={16} onClick={() => router('/productlist')}>Shop Now</Button>
            </Stack>
          </Center>
        </Paper>
      ) : (
        <Grid gutter={32}>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap={24}>
              {cartItems.map((item, idx) => (
                <Paper key={item.id} shadow="sm" p="md" radius="md" withBorder>
                  <Group align="flex-start" noWrap>
                    <Image
                      src={item.image}
                      alt={item.title}
                      radius="md"
                      style={{ width: 120, height: 120, objectFit: "cover" }}
                    />
                    <Stack gap={4} style={{ flex: 1 }}>
                      <Title order={4}>{item.name}</Title>
                      <Text color="dimmed" size="sm">{item.description}</Text>
                      <Text fw={700} size="lg">{item.price} AUD</Text>
                    </Stack>
                    <Button
                      variant="subtle"
                      color="red"
                      size="md"
                      onClick={() => handleRemove(item.id)}
                      leftIcon={<IconTrash size={18} />}
                    >
                      Remove
                    </Button>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Shipping Address Card above Cart Summary */}
            <Card shadow="md" p="lg" radius="md" withBorder mb={24} style={{ background: '#f8fafc' }}>
              <Group position="apart">
                <Group spacing={8}><IconMapPin size={20} color="#6366f1" /><Text fw={600}>Shipping Address</Text></Group>
                <Button variant="subtle" size="xs" leftIcon={<IconEdit size={16} />} onClick={() => openEditAddress('shipping')}>Edit</Button>
              </Group>
              <Divider my={8} />
              <Stack spacing={4}>
                <Text color="dark" fz="md">{shippingAddress}</Text>
                <Text color="dimmed" fz="sm">Email: {userEmail}</Text>
                <Text color="dimmed" fz="sm">Contact: {shippingContact}</Text>
              </Stack>
            </Card>
            <Paper shadow="xl" p="xl" radius="lg" withBorder style={{ background: "#f1f5f9" }}>
              <Title order={3} mb={16}>Cart Summary</Title>
              <Divider mb={16} />
              <Text size="lg">Total items: <b>{cartItems.length}</b></Text>
              <Text size="lg">Total cost: <b>{totalCost} AUD</b></Text>
              <Divider my={16} />
              <Button color="red" size="lg" fullWidth onClick={handleNavigate}>
                Checkout
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
      )}
      {/* Address Edit Modal */}
      <Modal opened={addressModalOpen} onClose={() => setAddressModalOpen(false)} title={`Edit ${editAddressType === 'shipping' ? 'Shipping' : 'Billing'} Address`} centered>
        <Stack>
          <TextInput
            label="Address"
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
            required
          />
          <Button color="indigo" onClick={saveAddress}>Save</Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default CartPage;
