const fetch = require('node-fetch');

exports.handler = async (event, context) => {
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

  try {
    const data = await fetch(`${process.env.SHOPIFY_STORE_URL}/admin/api/2023-01/products.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    const products = await data.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};

    const productsData = await productsResponse.json();
    const products = productsData.products;

    const allVariants = [];
    for (const product of products) {
      const productId = product.id;
      const variantsResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}/variants.json`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
      });

      if (!variantsResponse.ok) {
        console.warn(`Error fetching variants for product ${productId}: ${variantsResponse.statusText}`);
        continue;
      }

      const variantsData = await variantsResponse.json();
      allVariants.push(...variantsData.variants);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(allVariants),
    };
  } catch (error) {
    console.error('Error in getIDS:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch products or variants' }),
    };
  }
};
