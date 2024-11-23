const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const targetURL = 'https://app-directory.s3.amazonaws.com/hootlet/launched-app-directory-apps.json';

  try {
    const response = await fetch(targetURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow frontend access
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error in getIDS:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
