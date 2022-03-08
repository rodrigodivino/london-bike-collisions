/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'development' ? '' : '/london-bike-collisions',
  assetPrefix: process.env.NODE_ENV === 'development' ? '' : '/london-bike-collisions/',
}
