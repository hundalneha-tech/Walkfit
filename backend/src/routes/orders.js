import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user's orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.userId;

    // In real implementation, fetch from Shopify or local database
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Order.countDocuments({ userId });

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:orderId', authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.userId;

    // Fetch from local database
    // const order = await Order.findOne({ shopifyOrderId: orderId, userId });

    res.json({
      message: 'Order route ready for implementation',
      orderId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook: Handle Shopify order creation
router.post('/webhook/create', async (req, res) => {
  try {
    const order = req.body;

    // Verify webhook signature
    // TODO: Implement Shopify webhook verification

    // TODO: Create order in local database
    // TODO: Add points to user rewards

    console.log('Order created:', order.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
