const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { SHOPIFY_STORE_URL, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

  // Preflight check for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  // Extract product ID from query parameters
  const productId = event.queryStringParameters?.product_id;

  if (!SHOPIFY_STORE_URL || !SHOPIFY_ADMIN_API_ACCESS_TOKEN || !productId) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Missing necessary parameters or environment variables.',
      }),
    };
  }

  try {
    // Fetch product data from Shopify API
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: `Error fetching product: ${response.statusText}`,
        }),
      };
    }

    const data = await response.json();

    // Calculate inventory quantity
    const inventoryQuantity = data.product?.variants?.reduce((sum, variant) => sum + (variant.inventory_quantity || 0), 0) || 0;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ inventory_quantity: inventoryQuantity }),
    };
  } catch (error) {
    console.error('Error in getInventory.js:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Failed to fetch inventory quantity.',
      }),
    };
  }
};
