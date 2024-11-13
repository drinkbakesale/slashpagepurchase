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
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/inventory_levels.json?inventory_item_ids=${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      console.error('Error fetching data from Shopify:', response.status, response.statusText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Error fetching inventory data from Shopify' }),
      };
    }

    const data = await response.json();

    // Retrieve available inventory specifically from `InventoryLevel`
    const inventoryData = data.InventoryLevel && data.InventoryLevel.length > 0 
      ? data.InventoryLevel[0].available
      : 'N/A';

    return {
      statusCode: 200,
      body: JSON.stringify({ quantity: inventoryData }),
    };
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching inventory data' }),
    };
  }
};
