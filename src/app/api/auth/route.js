// app/api/auth/route.js
import { shopifyApp } from '@shopify/shopify-app-express';
import { apiVersion } from '@shopify/shopify-api';

const app = shopifyApp({
  api: {
    apiVersion: apiVersion.July23, // Use the latest API version
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: ['read_products', 'write_products'],
    hostScheme: 'https',
    hostName: process.env.HOSTNAME,
  },
  auth: {
    path: '/api/auth',
    callbackPath: '/api/auth/callback',
  },
});

export async function GET(req, res) {
  await app.auth.begin(req, res); // Start the OAuth process
}
