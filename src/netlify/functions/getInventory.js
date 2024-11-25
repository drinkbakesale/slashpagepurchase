const fetch = require('node-fetch');

exports.handler = async () => {
    try {
        const response = await fetch(`${process.env.SHOPIFY_STORE_URL}/admin/api/2023-01/products.json`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
            },
        });

        if (!response.ok) throw new Error(`Error fetching products: ${response.statusText}`);
        
        const productsData = await response.json();
        const allVariants = [];

        for (const product of productsData.products) {
            const variantsResponse = await fetch(`${process.env.SHOPIFY_STORE_URL}/admin/api/2023-01/products/${product.id}/variants.json`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
                },
            });

            if (!variantsResponse.ok) {
                console.warn(`Error fetching variants for product ${product.id}: ${variantsResponse.statusText}`);
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
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
Updated getInventory.js
Handle individual product inventory queries.

javascript
Copy code
const fetch = require('node-fetch');

exports.handler = async (event) => {
    const productId = event.queryStringParameters.product_id;

    if (!productId) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ error: 'Missing product ID' }),
        };
    }

    try {
        const response = await fetch(`${process.env.SHOPIFY_STORE_URL}/admin/api/2023-01/products/${productId}.json`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
            },
        });

        if (!response.ok) throw new Error(`Error fetching product: ${response.statusText}`);

        const data = await response.json();
        const inventoryQuantity = data.product.variants.reduce((sum, variant) => sum + (variant.inventory_quantity || 0), 0);

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
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
