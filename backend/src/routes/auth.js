import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    // Update last active
    await User.updateOne({ _id: user._id }, { lastActiveAt: new Date() });

    res.json({
      message: 'Login successful',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Google login
router.post('/google-login', async (req, res) => {
  try {
    const { email, firstName, lastName, picture } = req.body;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        firstName,
        lastName,
        profileImage: picture,
        password: Math.random().toString(36) // Random password for OAuth users
      });
      await user.save();
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    res.json({
      message: 'Google login successful',
      token,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
