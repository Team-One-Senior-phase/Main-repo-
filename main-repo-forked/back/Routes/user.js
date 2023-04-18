const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../ORM/user.model.js');

// user registration
router.post('/register', async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    // Validate input
    if (!user_name || !email || !password) {
      return res.status(400).json({ message: 'Please provide user_name, email, and password' });
    }

    if (typeof user_name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Name, email, and password must be strings' });
    }

    if (user_name.length < 3) {
      return res.status(400).json({ message: 'Name must be at least 3 characters long' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email address already in use' });
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({ user_name, email, password: hashedPassword});

    // Generate JWT token
    const token = jwt.sign({ user_id: newUser.user_id }, process.env.JWT_SECRET);

    // Send response with token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Email and password must be strings' });
    }

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);

    // Send response with token
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error'})
  }
  })

module.exports = router;
