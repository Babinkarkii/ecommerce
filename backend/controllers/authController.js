const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, getUserById: getUserByIdModel, getAllUsersModel } = require('../models/User');

const register = (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  findUserByEmail(email, (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    createUser(username, email, hashedPassword, 'user', (err, result) => {
      if (err) return res.status(500).json({ message: 'DB Error' });
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, results) => {
    if (results.length === 0)
      return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { id: user.id, email: user.email, username: user.username, role: user.role } });
  });
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  getUserByIdModel(userId, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
};

const getAllUsers = (req, res) => {
  getAllUsersModel((err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error' });
    res.json(results);
  });
};

module.exports = { register, login, getUserById, getAllUsers };
