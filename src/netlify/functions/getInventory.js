const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { SHOPIFY_STORE_URL, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

  // Handle preflight (OPTIONS) request for CORS
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

  // Check for required environment variables
  if (!SHOPIFY_ADMIN_API_ACCESS_TOKEN || !SHOPIFY_STORE_URL) {
    console.error('API Access Token or Store URL is missing');
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'API Access Token or Store URL is missing' }),
    };
  }

  // Log query string parameters
  console.log('Query string parameters:', event.queryStringParameters);

  const product_id = parseInt(event.queryStringParameters.product_id, 10);

  if (isNaN(product_id)) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Invalid product ID provided. Please provide a numeric product ID.' }),
    };
  }

  try {
    const response = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${product_id}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching data from Shopify:', response.status, response.statusText, errorText);
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Error fetching product data from Shopify', details: errorText }),
      };
    }

    const data = await response.json();
    console.log('Full product data:', JSON.stringify(data, null, 2));

    // Extract inventory quantity if available
    const inventoryQuantity = data.product && data.product.variants
      ? data.product.variants.reduce((sum, variant) => sum + (variant.inventory_quantity || 0), 0)
      : 'N/A';

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allowable HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type', // Allowable headers
      },
      body: JSON.stringify({ inventory_quantity: inventoryQuantity }),
    };
  } catch (error) {
    console.error('Error fetching product inventory quantity:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Error fetching product inventory quantity' }),
    };
  }
};
