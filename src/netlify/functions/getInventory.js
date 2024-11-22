const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { REACT_APP_SHOPIFY_STORE_URL, REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

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

  const product_Id = event.queryStringParameters.product_Id;

  if (!REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN || !REACT_APP_SHOPIFY_STORE_URL || !product_Id) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Missing necessary parameters or environment variables' }),
    };
  }

  try {
    const response = await fetch(`${REACT_APP_SHOPIFY_STORE_URL}/admin/api/2023-01/products/${product_Id}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    const data = await response.json();
    const inventoryQuantity = data.product && data.product.variants
      ? data.product.variants.reduce((sum, variant) => sum + (variant.inventory_quantity || 0), 0)
      : 'N/A';

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
    console.error('Error in getInventory:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch inventory quantity' }),
    };
  }
};
