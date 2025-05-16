const db = require('../config/db');

const getAllProducts = (callback) => {
  db.query("SELECT * FROM products", callback);
};

const createProduct = (name, price, description, category, company, colors, sizes, quantity, image, callback) => {
  const sql = "INSERT INTO products (name, price, description, category, company, colors, sizes, quantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, price, description, category, company, colors, sizes, quantity, image], callback);
};

const deleteProduct = (id, callback) => {
  db.query("DELETE FROM products WHERE id = ?", [id], callback);
};

const updateProduct = (id, name, price, description, category, company, colors, sizes, quantity, callback) => {
  const sql = "UPDATE products SET name=?, price=?, description=?, category=?, company=?, colors=?, sizes=?, quantity=? WHERE id=?";
  db.query(sql, [name, price, description, category, company, colors, sizes, quantity, id], callback);
};

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct };
