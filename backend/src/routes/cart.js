import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { shopifyStorefront } from '../config/shopify.js';

const router = express.Router();

// Create cart
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { items } = req.body;

    const query = `
      mutation CreateCart($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
            estimatedCost {
              subtotalAmount { amount }
              totalTaxAmount { amount }
              totalAmount { amount }
            }
          }
        }
      }
    `;

    const variables = {
      lines: items.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    };

    const response = await shopifyStorefront(query, variables);

    if (response.data && response.data.cartCreate) {
      res.json(response.data.cartCreate.cart);
    } else {
      throw new Error('Failed to create cart');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get checkout URL
router.post('/checkout-url', authenticateToken, async (req, res) => {
  try {
    const { items, pointsDiscount } = req.body;
    const user = req.user;

    // Create cart in Shopify
    const cartQuery = `
      mutation CreateCart($lines: [CartLineInput!]!, $buyerIdentity: CartBuyerIdentityInput) {
        cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
          cart {
            id
            checkoutUrl
            estimatedCost {
              totalAmount { amount }
            }
          }
        }
      }
    `;

    const variables = {
      lines: items.map(item => ({
        merchandiseId: item.variantId || item.id,
        quantity: item.quantity
      })),
      buyerIdentity: {
        email: user.email
      }
    };

    const response = await shopifyStorefront(cartQuery, variables);

    if (response.data && response.data.cartCreate) {
      const { checkoutUrl, estimatedCost } = response.data.cartCreate.cart;

      res.json({
        checkoutUrl,
        cartTotal: estimatedCost.totalAmount.amount,
        pointsApplied: pointsDiscount || 0
      });
    } else {
      throw new Error('Failed to create checkout');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
