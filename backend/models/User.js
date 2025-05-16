const db = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = (username, email, password, role = 'user', callback) => {
  const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, role], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

const getUserById = (id, callback) => {
  const sql = 'SELECT id, username, email, role FROM users WHERE id = ?';
  db.query(sql, [id], callback);
};

const getAllUsersModel = (callback) => {
  const sql = 'SELECT id, username, email, role FROM users';
  db.query(sql, callback);
};

module.exports = { createUser, findUserByEmail, getUserById, getAllUsersModel };
