const { getAllProducts, createProduct, deleteProduct, updateProduct } = require('../models/Product');

const getProducts = (req, res) => {
  getAllProducts((err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });
    res.json(results);
  });
};

const addProduct = (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);
  const { name, price, description, category, company, colors, sizes, quantity } = req.body;
  const image = req.file ? req.file.filename : null;
  if (!name || !price) return res.status(400).json({ message: 'Required fields missing' });

  createProduct(name, price, description, category, company, colors, sizes, quantity, image, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB insert error' });
    res.status(201).json({ message: 'Product added' });
  });
};

const removeProduct = (req, res) => {
  const { id } = req.params;
  deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json({ message: 'Error deleting product' });
    res.json({ message: 'Product deleted' });
  });
};

const editProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, company, colors, sizes, quantity } = req.body;
  updateProduct(id, name, price, description, category, company, colors, sizes, quantity, (err, result) => {
    if (err) return res.status(500).json({ message: 'DB update error' });
    res.json({ message: 'Product updated' });
  });
};

module.exports = { getProducts, addProduct, removeProduct, editProduct };
