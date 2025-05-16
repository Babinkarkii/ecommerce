const express = require('express');
const { register, login, getUserById, getAllUsers } = require('../controllers/authController');
const adminMiddleware = require('../middleware/admin');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:id', getUserById);
router.get('/all', adminMiddleware, getAllUsers);
router.get('/login', (req, res) => {
  res.send('Please use POST to /api/auth/login to log in as user or admin.');
});

module.exports = router;
