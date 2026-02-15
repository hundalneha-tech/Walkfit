import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get rewards balance
router.get('/balance', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      userId: user._id,
      totalPoints: user.rewards.totalPoints,
      availablePoints: user.rewards.availablePoints,
      pendingPoints: user.rewards.pendingPoints,
      tier: user.rewards.tier,
      nextTierPoints: user.rewards.tier === 'Bronze' ? 1000 : 
                      user.rewards.tier === 'Silver' ? 2500 : 
                      user.rewards.tier === 'Gold' ? 5000 : Infinity
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get rewards catalog
router.get('/catalog', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    // TODO: Fetch from rewards catalog collection in MongoDB
    const rewards = [
      {
        id: 'reward_1',
        name: 'Premium Walking Shoes',
        pointsRequired: 500,
        image: '👟',
        tier: 'Silver'
      },
      {
        id: 'reward_2',
        name: '$5 Discount',
        pointsRequired: 100,
        image: '🎟️',
        tier: 'Bronze'
      }
    ];

    res.json({
      products: rewards,
      pagination: {
        total: rewards.length,
        page: parseInt(page),
        perPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Redeem reward
router.post('/redeem', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { rewardId, shippingAddress } = req.body;

    // TODO: Implement reward redemption logic
    // 1. Verify user has enough points
    // 2. Create order in Shopify
    // 3. Deduct points
    // 4. Send confirmation email

    res.json({
      success: true,
      message: 'Reward redeemed successfully',
      orderId: 'ORDER_12345',
      pointsDeducted: 500,
      remainingPoints: 2000
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add points (admin/internal)
router.post('/add-points', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, category, description } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add points
    user.rewards.availablePoints += amount;
    user.rewards.totalPoints += amount;
    await user.save();

    res.json({
      success: true,
      newBalance: user.rewards.availablePoints,
      pointsAdded: amount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get points history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 20 } = req.query;

    // TODO: Fetch from rewards transactions collection

    res.json({
      transactions: [],
      pagination: {
        total: 0,
        page: parseInt(page),
        perPage: limit
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
