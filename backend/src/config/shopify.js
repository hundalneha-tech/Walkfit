import ShopifyAPINode from 'shopify-api-node';

const shopify = new ShopifyAPINode({
  shopName: process.env.SHOPIFY_STORE_NAME,
  accessToken: process.env.SHOPIFY_ADMIN_API_PASSWORD
});

export default shopify;

// Shopify Storefront API Client for product browsing
export const shopifyStorefront = async (query, variables = {}) => {
  const endpoint = `https://${process.env.SHOPIFY_STORE_NAME}.myshopify.com/api/2024-01/graphql.json`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_TOKEN
      },
      body: JSON.stringify({ query, variables })
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(`Shopify API Error: ${JSON.stringify(data.errors)}`);
    }

    return data;
  } catch (error) {
    console.error('Shopify Storefront API Error:', error);
    throw error;
  }
};
