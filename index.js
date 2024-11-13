require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Route to get inventory count by product ID
app.get('/inventory/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await axios.get(
      `${process.env.SHOPIFY_STORE_URL}/admin/api/2023-10/products/${productId}.json`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
      }
    );

    const inventoryItem = response.data.product.variants[0].inventory_quantity;
    res.json({ inventory: inventoryItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching inventory data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
