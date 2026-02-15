# WalkFit Full-Stack Application

This is the complete WalkFit fitness mobile app built with a modern full-stack architecture:

- **Frontend:** Vite + React 18
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **E-Commerce:** Shopify Integration
- **Rewards:** Custom points system

## Project Structure

```
walkfit-fullstack/
├── frontend/                   # React Vite app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Screen components
│   │   ├── services/          # API client
│   │   ├── styles/            # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # Express API
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Database schemas
│   │   ├── services/          # Business services
│   │   ├── middleware/        # Auth, error handling
│   │   ├── config/            # Configs (DB, Shopify)
│   │   └── server.js          # Entry point
│   ├── .env.example
│   └── package.json
│
└── WalkFit-Technical-Specification.md  # Full tech docs
```

## Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API will run on http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will run on http://localhost:5173

## Environment Variables

Create `.env` file in backend directory with Shopify and database credentials.

See `.env.example` for all available options.

## API Endpoints

- **Auth:** POST `/api/auth/login`, `/api/auth/signup`
- **Shopify:** GET `/api/shopify/products`, `/api/shopify/products/:id`
- **Cart:** POST `/api/cart/create`, GET `/api/cart/:cartId`
- **Orders:** GET `/api/orders`, GET `/api/orders/:orderId`
- **Rewards:** GET `/api/rewards/balance`, `/api/rewards/catalog`
- **User:** GET `/api/user/profile`, PUT `/api/user/profile`

## Features

✅ User Authentication (JWT)
✅ Shopify Product Integration
✅ Shopping Cart & Checkout
✅ Rewards Points System
✅ User Profiles
✅ Activity Tracking
✅ Mobile-First UI

## Deployment

See WalkFit-Technical-Specification.md for AWS deployment instructions.

## Next Steps

1. Install Node.js (v16+)
2. Set up MongoDB
3. Configure Shopify API credentials
4. Update `.env` with your credentials
5. Run backend and frontend
