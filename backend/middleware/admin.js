const db = require('../config/db');

const adminMiddleware = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(401).json({ message: 'Not authenticated' });

  db.query('SELECT role FROM users WHERE id = ?', [userId], (err, results) => {
    if (err || results.length === 0) return res.status(403).json({ message: 'Forbidden' });
    if (results[0].role !== 'admin') return res.status(403).json({ message: 'Admins only' });
    next();
  });
};

module.exports = adminMiddleware; 