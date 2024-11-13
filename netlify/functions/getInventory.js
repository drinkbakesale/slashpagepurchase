// netlify/functions/getInventory.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;
  const SHOPIFY_ADMIN_API_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;
  const productIds = ['48766615650594', '48766619058466', '48766610997538', '48766158111010', '48766621876514', '49275197653282']; // Update this with your actual product IDs

  try {
    const inventoryData = await Promise.all(
      productIds.map(async (productId) => {
        const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/inventory_levels/${productId}.json`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
          },
        });
        const data = await response.json();
        return { productId, quantity: data.inventory_item.quantity };
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(inventoryData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
