const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
 
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
 
const app = express();
 
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
 
// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'AgroConnect API is running!' });
});
 
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });