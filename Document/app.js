require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { port, frontendUrl } = require('./config/config');
const errorHandler = require('./utils/errorHandler');
const reportRoutes = require('./routes/reportRoutes');
const crimeRoutes = require('./routes/crimeRoutes');
const forumRoutes = require('./routes/forumRoutes');
const cors = require('cors'); // Import cors package

const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json());
app.use(cors({ origin: frontendUrl, optionsSuccessStatus: 200 })); // Use FRONTEND_URL for CORS

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/reports', reportRoutes);
app.use('/api/crimes', crimeRoutes);
app.use('/api/forum', forumRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});