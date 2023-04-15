require('dotenv').config();
const shell = require('shelljs');

console.log(`Shopify store: ${process.env.SHOPIFY_THEME_STORE}`);
console.log(`Shopify password: ${process.env.SHOPIFY_THEME_PASSWORD}`);

const command = `shopify theme dev --store ${process.env.SHOPIFY_THEME_STORE} --password ${process.env.SHOPIFY_THEME_PASSWORD}`;

shell.exec(command, { async: true });
