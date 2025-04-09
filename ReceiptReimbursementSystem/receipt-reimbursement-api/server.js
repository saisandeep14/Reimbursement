const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Make uploads folder static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/receipts', require('./routes/receiptRoutes'));

// Server health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Catch-all route
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Server error' });
});

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
