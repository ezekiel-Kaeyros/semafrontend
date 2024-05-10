/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};
