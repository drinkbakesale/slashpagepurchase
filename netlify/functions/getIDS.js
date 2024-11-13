const fetch = require('node-fetch');

exports.handler = async function () {
  const { SHOPIFY_STORE_URL, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

  // Check if necessary environment variables are set
  if (!SHOPIFY_ADMIN_API_ACCESS_TOKEN || !SHOPIFY_STORE_URL) {
    console.error('API Access Token or Store URL is missing');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API Access Token or Store URL is missing' }),
    };
  }

  try {
    // Step 1: Fetch all products
    const productsResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!productsResponse.ok) {
      console.error('Error fetching products:', productsResponse.status, productsResponse.statusText);
      return {
        statusCode: productsResponse.status,
        body: JSON.stringify({ error: 'Error fetching products from Shopify' }),
      };
    }

    const productsData = await productsResponse.json();
    const products = productsData.products;

    // Step 2: Fetch variants for each product
    const allVariants = {};
    for (const product of products) {
      const productId = product.id;

      // Fetch variants for each product
      const variantsResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}/variants.json`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
      });

      if (!variantsResponse.ok) {
        console.error(`Error fetching variants for product ${productId}:`, variantsResponse.status, variantsResponse.statusText);
        continue; // Skip to the next product if there's an error
      }

      const variantsData = await variantsResponse.json();
      allVariants[productId] = variantsData.variants; // Store variants for each product by ID
    }

    // Return all products and their variants
    return {
      statusCode: 200,
      body: JSON.stringify({ products: allVariants }, null, 2),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  }
};
