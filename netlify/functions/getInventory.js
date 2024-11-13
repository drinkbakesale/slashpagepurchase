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
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    // Check if the response from Shopify is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching data from Shopify:', response.status, response.statusText, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Error fetching product data from Shopify', details: errorText }),
      };
    }

    const data = await response.json();
    console.log('Full product data:', JSON.stringify(data, null, 2));

    // Try accessing inventory quantity if available
    const inventoryQuantity = data.product && data.product.inventory_quantity 
      ? data.product.inventory_quantity 
      : 'N/A';

    return {
      statusCode: 200,
      body: JSON.stringify({ inventory_quantity: inventoryQuantity }),
    };
  } catch (error) {
    console.error('Error fetching product inventory quantity:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching product inventory quantity' }),
    };
  }
};
