import React, { useEffect, useState } from "react";
import {
  Box, Container, Divider, Group, Stack, Text, Title, Table, Button, Modal, TextInput, Card, Badge, Paper
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconArrowRight, IconEdit, IconTrash, IconUsers, IconBox } from "@tabler/icons-react";
import DashboardComponent from "../components/DashboardComponent";
import { admin } from "../mock/mock";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    fetch(`/api/auth/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.role !== 'admin') {
          navigate('/login');
        }
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  useEffect(() => {
    fetch("/api/auth/all", {
      headers: { 'x-user-id': localStorage.getItem('userId') }
    })
      .then(res => res.json())
      .then(data => setUsers(data));
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDeleteProduct = (id) => {
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: { 'x-user-id': localStorage.getItem('userId') }
    })
      .then(res => res.json())
      .then(() => setProducts(products.filter(p => p.id !== id)));
  };

  const openEditModal = (product) => {
    setEditProduct({ ...product });
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/products/${editProduct.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-user-id': localStorage.getItem('userId') },
      body: JSON.stringify(editProduct)
    })
      .then(res => res.json())
      .then(() => {
        setProducts(products.map(p => p.id === editProduct.id ? editProduct : p));
        setEditModalOpen(false);
      });
  };

  return (
    <Container size={"xl"} mt={60} mb={60}>
      <Group position="apart" mb={20}>
        <Title order={1} align="center" color="dark">
          Admin Dashboard
        </Title>
        <Button color="red" variant="outline" onClick={() => {
          localStorage.clear();
          navigate('/login');
        }}>Logout</Button>
      </Group>
      <Group position="center" mb={40} spacing="xl">
        <Paper shadow="md" p="lg" radius="md" withBorder>
          <Group>
            <IconUsers size={32} color="blue" />
            <Stack spacing={0}>
              <Text size="xl" fw={700}>{users.length}</Text>
              <Text size="sm" color="dimmed">Total Users</Text>
            </Stack>
          </Group>
        </Paper>
        <Paper shadow="md" p="lg" radius="md" withBorder>
          <Group>
            <IconBox size={32} color="green" />
            <Stack spacing={0}>
              <Text size="xl" fw={700}>{products.length}</Text>
              <Text size="sm" color="dimmed">Total Products</Text>
            </Stack>
          </Group>
        </Paper>
      </Group>
      <Card withBorder shadow="sm" mb={40} p="lg" radius="md">
        <Group justify="space-between">
          <Title order={2}>All Users</Title>
          <Badge color="blue" size="lg">{users.length} users</Badge>
        </Group>
        <Divider my="md" />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>ID</th><th>Username</th><th>Email</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <Badge color={u.role === 'admin' ? 'red' : 'gray'}>
                    {u.role}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Card withBorder shadow="sm" mb={40} p="lg" radius="md">
        <Group justify="space-between">
          <Title order={2}>All Products</Title>
          <Link to={"/admin/add-product"} style={{ textDecoration: "none" }}>
            <Button leftIcon={<IconArrowRight size={18} />} color="dark">
              Add Product
            </Button>
          </Link>
        </Group>
        <Divider my="md" />
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Price</th><th>Description</th><th>Category</th><th>Company</th><th>Colors</th><th>Sizes</th><th>Quantity</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>{p.company}</td>
                <td>{p.colors}</td>
                <td>{p.sizes}</td>
                <td>{p.quantity}</td>
                <td>
                  <Button color="blue" size="xs" mr={4} onClick={() => openEditModal(p)}>
                    <IconEdit size={16} />
                  </Button>
                  <Button color="red" size="xs" onClick={() => handleDeleteProduct(p.id)}>
                    <IconTrash size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Edit Product">
        {editProduct && (
          <form onSubmit={handleEditSubmit}>
            <TextInput label="Name" name="name" value={editProduct.name} onChange={handleEditChange} required />
            <TextInput label="Price" name="price" value={editProduct.price} onChange={handleEditChange} required />
            <TextInput label="Description" name="description" value={editProduct.description} onChange={handleEditChange} />
            <TextInput label="Category" name="category" value={editProduct.category} onChange={handleEditChange} />
            <TextInput label="Company" name="company" value={editProduct.company} onChange={handleEditChange} />
            <TextInput label="Colors" name="colors" value={editProduct.colors} onChange={handleEditChange} />
            <TextInput label="Sizes" name="sizes" value={editProduct.sizes} onChange={handleEditChange} />
            <TextInput label="Quantity" name="quantity" value={editProduct.quantity} onChange={handleEditChange} />
            <Button type="submit" color="blue" mt={12} fullWidth>Save Changes</Button>
          </form>
        )}
      </Modal>
    </Container>
  );
};

export default AdminDashboard;