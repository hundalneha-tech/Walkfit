import express from 'express';
import { shopifyStorefront } from '../config/shopify.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all products
router.get('/products', optionalAuth, async (req, res) => {
  try {
    const { first = 20, after = null, sortKey = 'TITLE' } = req.query;

    const query = `
      query GetProducts($first: Int!, $after: String, $sortKey: ProductSortKeys) {
        products(first: $first, after: $after, sortKey: $sortKey) {
          edges {
            cursor
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice { amount currencyCode }
                maxVariantPrice { amount currencyCode }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price { amount currencyCode }
                    available
                    sku
                  }
                }
              }
              images(first: 5) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
            }
          }
          pageInfo { hasNextPage }
        }
      }
    `;

    const response = await shopifyStorefront(query, { first: parseInt(first), after, sortKey });

    if (response.data && response.data.products) {
      res.json(response.data.products);
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/products/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          description
          handle
          variants(first: 20) {
            edges {
              node {
                id
                title
                price { amount }
                available
              }
            }
          }
          images(first: 10) {
            edges {
              node { src altText }
            }
          }
        }
      }
    `;

    const response = await shopifyStorefront(query, { id });

    if (response.data && response.data.product) {
      res.json(response.data.product);
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search products
router.get('/search', optionalAuth, async (req, res) => {
  try {
    const { query: searchQuery, first = 20 } = req.query;

    if (!searchQuery) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const query = `
      query SearchProducts($query: String!, $first: Int!) {
        search(query: $query, types: PRODUCT, first: $first) {
          edges {
            node {
              ... on Product {
                id
                title
                handle
                priceRange {
                  minVariantPrice { amount }
                  maxVariantPrice { amount }
                }
              }
            }
          }
        }
      }
    `;

    const response = await shopifyStorefront(query, { query: searchQuery, first: parseInt(first) });

    if (response.data && response.data.search) {
      res.json(response.data.search);
    } else {
      throw new Error('Search failed');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
