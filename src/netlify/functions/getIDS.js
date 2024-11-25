const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Check if the request is a preflight (OPTIONS) request
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
        // Proxy request for external data (e.g., app-directory.s3.amazonaws.com)
        const externalURL = 'https://app-directory.s3.amazonaws.com/hootlet/launched-app-directory-apps.json';
        const externalResponse = await fetch(externalURL);

        if (!externalResponse.ok) {
            console.warn(`Error fetching external data: ${externalResponse.statusText}`);
        } else {
            console.log('Fetched external data successfully');
        }

        // Fetch Shopify products
        const shopifyResponse = await fetch(`${process.env.SHOPIFY_STORE_URL}/admin/api/2023-01/products.json`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
            },
        });

        if (!shopifyResponse.ok) {
            throw new Error(`Error fetching products: ${shopifyResponse.statusText}`);
        }

        const productsData = await shopifyResponse.json();
        const allVariants = [];

        // Fetch variants for each product
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
        console.error('Error in getIDS:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ error: error.message }),
        };
    }
};
