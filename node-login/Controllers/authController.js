const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async (req, res) => {
  const { first_name, last_name, email, password, avatar } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `INSERT INTO users (first_name, last_name, email, password_hash, avatar) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [first_name, last_name, email, hashedPassword, avatar], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  });
};

exports.getProfile = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sql = 'SELECT id, first_name, last_name, email, phone_number, role FROM users WHERE id = ?';
    db.query(sql, [decoded.id], (err, results) => {
      if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });
      res.json(results[0]);
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};