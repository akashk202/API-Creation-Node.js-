require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');


// Import routes
const userRoutes = require('./routes/userRoutes');
const detailsRoutes = require('./routes/detailsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/details', detailsRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/details', detailsRoutes);



// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});