import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables
dotenv.config();

// Get __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import database connection
import { connectDB } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import shopifyRoutes from './routes/shopify.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import rewardsRoutes from './routes/rewards.js';
import userRoutes from './routes/user.js';

// Import middleware
import { authenticateToken } from './middleware/auth.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Logging Middleware
app.use(morgan('combined'));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/shopify', shopifyRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/user', userRoutes);

// Protected Test Route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ 
    message: 'This is a protected endpoint',
    user: req.user 
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error Handler Middleware
app.use(errorHandler);

// Connect to Database and Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Database connected');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 WalkFit API Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🔗 API URL: ${process.env.API_URL}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
