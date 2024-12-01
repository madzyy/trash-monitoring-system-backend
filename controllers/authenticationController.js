const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const db = require('../database');

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key

const AuthController = {
  register: [
    // Validation middleware
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { username, password } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(sql, [username, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.json({ message: 'User registered successfully.' });
      });
    },
  ],

  login: async (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
      if (err || results.length === 0)
        return res.status(401).json({ error: 'Invalid credentials.' });

      const user = results[0];

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials.' });

      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h',
      });

      res.json({ token });
    });
  },
};

module.exports = AuthController;
