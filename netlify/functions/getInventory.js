// netlify/functions/getInventory.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { SHOPIFY_STORE_URL, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

  if (!SHOPIFY_ADMIN_API_ACCESS_TOKEN || !SHOPIFY_STORE_URL) {
    console.error('API Access Token or Store URL is missing');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API Access Token or Store URL is missing' }),
    };
  }

  const productId = event.queryStringParameters.productId;

  try {
    // Fetching variants of the specified product
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}/variants.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      console.error('Error fetching data from Shopify:', response.status, response.statusText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Error fetching variant data from Shopify' }),
      };
    }

    const data = await response.json();

    // Assuming the first variant's `inventory_quantity`
    const inventoryQuantity = data.variants && data.variants.length > 0 
      ? data.variants[0].inventory_quantity 
      : 'N/A';

    return {
      statusCode: 200,
      body: JSON.stringify({ inventory_quantity: inventoryQuantity }),
    };
  } catch (error) {
    console.error('Error fetching inventory quantity:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching inventory quantity' }),
    };
  }
};
