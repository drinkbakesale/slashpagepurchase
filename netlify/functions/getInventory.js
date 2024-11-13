// netlify/functions/getInventory.js
const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const productId = event.queryStringParameters.productId;

    if (!productId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Product ID is required' }),
        };
    }

    try {
        const response = await fetch(`https://bakesale-site.myshopify.com/admin/api/2023-01/products/${productId}.json`, {
            headers: {
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: 'Error fetching inventory data' }),
            };
        }

        const data = await response.json();
        
        // Check if the product and inventory data are defined as expected
        const inventoryQuantity = data?.product?.variants?.[0]?.inventory_quantity;

        return {
            statusCode: 200,
            body: JSON.stringify({ productId, quantity: inventoryQuantity || 'Unavailable' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
