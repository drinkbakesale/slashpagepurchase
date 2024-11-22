export const getInventory = async (product_Id) => {
  const { REACT_APP_SHOPIFY_STORE_URL, REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN } = process.env;

  if (!REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN || !REACT_APP_SHOPIFY_STORE_URL) {
    throw new Error('API Access Token or Store URL is missing');
  }

  if (!product_Id) {
    throw new Error('Invalid product ID');
  }

  try {
    const response = await fetch(`${REACT_APP_SHOPIFY_STORE_URL}/admin/api/2023-01/products/${product_Id}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': REACT_APP_SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product data: ${response.statusText}`);
    }

    const data = await response.json();
    const inventoryQuantity = data.product && data.product.variants
      ? data.product.variants.reduce((sum, variant) => sum + (variant.inventory_quantity || 0), 0)
      : 'N/A';

    return inventoryQuantity;
  } catch (error) {
    console.error('Error in getInventory:', error);
    throw error;
  }
};
