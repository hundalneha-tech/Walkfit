import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.getPublicProfile());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, phone, address, preferences, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        address,
        preferences,
        profileImage,
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user stats
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      stats: user.stats,
      rewards: user.rewards
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update preferences
router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { preferences },
      { new: true }
    );

    res.json({
      message: 'Preferences updated',
      preferences: user.preferences
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
