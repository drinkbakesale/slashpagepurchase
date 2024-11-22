export const getIDS = async () => {
  const { SHOPIFY_STORE_URL, SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

  if (!SHOPIFY_ADMIN_API_ACCESS_TOKEN || !SHOPIFY_STORE_URL) {
    throw new Error('API Access Token or Store URL is missing');
  }

  try {
    const productsResponse = await fetch(`${SHOPIFY_STORE_URL}/admin/api/2023-01/products.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!productsResponse.ok) {
      throw new Error(`Error fetching products: ${productsResponse.statusText}`);
    }

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

    return allVariants;
  } catch (error) {
    console.error('Error in getIDS:', error);
    throw error;
  }
};

// Add this line for default export
export default getIDS;
