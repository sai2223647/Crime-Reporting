require('dotenv').config();

module.exports = {
  mongodbUri: process.env.MONGO_URI,
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000', // Default to localhost:3000 if not set
};