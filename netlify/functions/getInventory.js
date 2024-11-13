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

  // Log the query string parameters to verify `product_id` is being passed correctly
  console.log('Query string parameters:', event.queryStringParameters);

  const product_id = parseInt(event.queryStringParameters.product_id, 10);

  if (isNaN(product_id)) {
    return {
      statusCode: 400,
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
        body: JSON.stringify({ error: 'Error fetching product data from Shopify', details: errorText }),
      };
    }

    const data = await response.json();
    console.log('Full product data:', JSON.stringify(data, null, 2));

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
