# WalkFit App - Technical Specification Document
**Version:** 1.0  
**Date:** February 15, 2026  
**Document Type:** Technical Specification  
**Status:** Draft

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Core Features & Modules](#core-features--modules)
5. [Shopify Integration](#shopify-integration)
6. [Database Schema](#database-schema)
7. [API Specifications](#api-specifications)
8. [Security & Privacy](#security--privacy)
9. [Third-Party Integrations](#third-party-integrations)
10. [Deployment & Infrastructure](#deployment--infrastructure)
11. [Testing Strategy](#testing-strategy)
12. [Timeline & Milestones](#timeline--milestones)

---

## 1. Executive Summary

### 1.1 Project Overview
WalkFit is a comprehensive fitness tracking mobile application that rewards users for physical activity. The app integrates with Shopify as the backend commerce platform for managing the store, products, and rewards redemption.

### 1.2 Business Objectives
- Track user fitness activities (steps, calories, distance, active minutes)
- Gamify fitness through challenges and leaderboards
- Reward users with SSG Coins for activity completion
- Enable coin redemption for products via Shopify-powered store
- Support brand partnerships and corporate wellness programs
- Drive user engagement and retention through rewards marketplace

### 1.3 Target Platforms
- **iOS:** iPhone (iOS 14+), iPad
- **Android:** Smartphones (Android 8.0+), Tablets
- **Web:** Progressive Web App (PWA) for admin/corporate dashboard

### 1.4 Key Stakeholders
- End Users (Fitness enthusiasts)
- Brand Partners (Reward providers)
- Corporate Clients (B2B wellness programs)
- WalkFit Admin Team
- Development Team
- QA Team
- Product Management

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
├─────────────────────────────────────────────────────────┤
│  iOS App (Swift)  │  Android App (Kotlin)  │  Web PWA  │
└──────────────┬──────────────────┬───────────────────────┘
               │                  │
               ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                   API GATEWAY LAYER                     │
├─────────────────────────────────────────────────────────┤
│  Authentication  │  Rate Limiting  │  Load Balancing    │
└──────────────┬──────────────────┬───────────────────────┘
               │                  │
               ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                  APPLICATION LAYER                      │
├─────────────────────────────────────────────────────────┤
│  WalkFit Backend API (Node.js/Express)                  │
│  ┌──────────┬──────────┬──────────┬──────────┐          │
│  │ Activity │ Rewards  │ Users    │Analytics │          │
│  │ Tracking │ Engine   │ Service  │ Service  │          │
│  └──────────┴──────────┴──────────┴──────────┘          │
└──────────────┬──────────────────┬───────────────────────┘
               │                  │
               ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│               INTEGRATION LAYER                         │
├─────────────────────────────────────────────────────────┤
│  Shopify API  │  Payment  │  Analytics │  Notifications │
│  Integration  │  Gateway  │  (Mixpanel)│  (Firebase)    │
└──────────────┬──────────────────┬───────────────────────┘
               │                  │
               ▼                  ▼
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                           │
├─────────────────────────────────────────────────────────┤
│  PostgreSQL   │  Redis Cache  │  S3 Storage  │  Shopify │
│  (Primary DB) │  (Sessions)   │  (Assets)    │  (Store) │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Architecture Principles
- **Microservices:** Modular, independently deployable services
- **API-First:** RESTful APIs for all client-server communication
- **Scalability:** Horizontal scaling with load balancers
- **Caching:** Redis for session management and frequent queries
- **Security:** OAuth 2.0, JWT tokens, HTTPS encryption
- **Monitoring:** Real-time logging and performance monitoring

---

## 3. Technology Stack

### 3.1 Mobile Applications

#### iOS App
- **Language:** Swift 5.5+
- **UI Framework:** SwiftUI
- **Architecture:** MVVM (Model-View-ViewModel)
- **Networking:** Alamofire
- **Data Persistence:** Core Data, Realm
- **Analytics:** Firebase Analytics
- **Push Notifications:** Firebase Cloud Messaging
- **Health Tracking:** HealthKit, CoreMotion
- **Minimum iOS Version:** iOS 14.0

#### Android App
- **Language:** Kotlin
- **UI Framework:** Jetpack Compose
- **Architecture:** MVVM with Clean Architecture
- **Networking:** Retrofit + OkHttp
- **Data Persistence:** Room Database
- **Analytics:** Firebase Analytics
- **Push Notifications:** Firebase Cloud Messaging
- **Health Tracking:** Google Fit API
- **Minimum Android Version:** Android 8.0 (API 26)

### 3.2 Backend Services

#### Primary Backend
- **Runtime:** Node.js 18 LTS
- **Framework:** Express.js 4.x
- **Language:** TypeScript 5.x
- **API Style:** RESTful API
- **Authentication:** Passport.js (JWT, OAuth 2.0)
- **Validation:** Joi / Express Validator
- **Documentation:** Swagger/OpenAPI 3.0

#### Database
- **Primary Database:** PostgreSQL 15
  - User data, activities, transactions
  - Full ACID compliance
  - JSON support for flexible schemas
- **Cache Layer:** Redis 7.x
  - Session storage
  - Leaderboard caching
  - Rate limiting
- **Search:** Elasticsearch (optional for advanced search)

#### File Storage
- **Primary:** Amazon S3
  - User profile images
  - Challenge media
  - Product images
- **CDN:** CloudFront for global delivery

### 3.3 Shopify Integration

#### Shopify Platform
- **Plan:** Shopify Plus (Enterprise)
- **Storefront API:** GraphQL (v2023-10)
- **Admin API:** REST/GraphQL
- **Custom App:** Private Shopify app with API credentials
- **Webhooks:** Real-time event notifications
- **Custom Checkout:** Headless commerce integration

#### Shopify Features Used
- **Products:** Store catalog management
- **Collections:** Product categorization
- **Inventory:** Stock management
- **Orders:** Transaction processing
- **Customers:** Sync with WalkFit users
- **Discounts:** SSG Coin redemption codes
- **Webhooks:** Order updates, inventory changes
- **Analytics:** Sales reporting

### 3.4 Third-Party Services

#### Payment Processing
- **Primary Gateway:** Razorpay (India)
- **Alternative:** PayU, Paytm
- **International:** Stripe (if expanding globally)
- **UPI:** Direct UPI integration

#### Analytics & Monitoring
- **App Analytics:** Firebase Analytics, Mixpanel
- **Backend Monitoring:** New Relic, DataDog
- **Error Tracking:** Sentry
- **Logging:** CloudWatch, ELK Stack

#### Notifications
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **Email:** SendGrid, AWS SES
- **SMS:** Twilio, MSG91

#### Maps & Location
- **Maps:** Google Maps API
- **Geocoding:** Google Geocoding API
- **Routes:** Google Directions API

---

## 4. Core Features & Modules

### 4.1 User Management Module

#### 4.1.1 Registration & Authentication
**Features:**
- Email/Password registration
- Social login (Google, Facebook, Apple)
- Phone number verification (OTP)
- Profile creation with basic info
- Privacy settings configuration

**Technical Implementation:**
```javascript
// User Registration Flow
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "hashed_password",
  "name": "John Doe",
  "phoneNumber": "+919876543210"
}

Response:
{
  "success": true,
  "userId": "uuid",
  "token": "jwt_token",
  "user": { user_object }
}
```

**Database Schema:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    height_cm INTEGER,
    weight_kg DECIMAL(5,2),
    is_pro_member BOOLEAN DEFAULT FALSE,
    pro_subscription_expires_at TIMESTAMP,
    ssg_coins_balance INTEGER DEFAULT 0,
    total_steps BIGINT DEFAULT 0,
    total_distance_km DECIMAL(10,2) DEFAULT 0,
    total_calories BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    shopify_customer_id BIGINT
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_shopify_customer_id ON users(shopify_customer_id);
```

#### 4.1.2 User Profile Management
- Update personal information
- Upload/change profile photo
- Set fitness goals
- Manage privacy settings
- View activity history
- Account deletion (GDPR compliance)

---

### 4.2 Activity Tracking Module

#### 4.2.1 Step Tracking
**Features:**
- Real-time step counting
- Background tracking
- Daily/weekly/monthly aggregation
- Historical data visualization
- Goal setting and progress tracking

**Technical Implementation:**

**iOS (HealthKit Integration):**
```swift
import HealthKit

class HealthKitManager {
    let healthStore = HKHealthStore()
    
    func requestAuthorization() {
        let stepType = HKQuantityType.quantityType(
            forIdentifier: .stepCount
        )!
        
        healthStore.requestAuthorization(
            toShare: [],
            read: [stepType]
        ) { success, error in
            // Handle authorization
        }
    }
    
    func fetchSteps(completion: @escaping (Int) -> Void) {
        // Query HealthKit for step count
        // Aggregate and return data
    }
}
```

**Android (Google Fit):**
```kotlin
class GoogleFitManager(context: Context) {
    private val fitnessOptions = FitnessOptions.builder()
        .addDataType(DataType.TYPE_STEP_COUNT_DELTA)
        .build()
    
    fun requestPermissions(activity: Activity) {
        GoogleSignIn.requestPermissions(
            activity,
            fitnessOptions
        )
    }
    
    fun readSteps(onSuccess: (Int) -> Unit) {
        // Read step count from Google Fit
        // Return aggregated data
    }
}
```

**Backend API:**
```javascript
// Sync steps to backend
POST /api/v1/activities/steps/sync
{
  "date": "2026-02-15",
  "steps": 8750,
  "source": "healthkit",
  "startTime": "2026-02-15T00:00:00Z",
  "endTime": "2026-02-15T23:59:59Z"
}

Response:
{
  "success": true,
  "coinsEarned": 87, // 10 steps = 1 coin
  "totalSteps": 8750,
  "dailyGoalProgress": 87.5
}
```

**Database Schema:**
```sql
CREATE TABLE daily_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    steps INTEGER DEFAULT 0,
    distance_km DECIMAL(10,2) DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    active_minutes INTEGER DEFAULT 0,
    heart_points INTEGER DEFAULT 0,
    activity_score INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, activity_date)
);

CREATE INDEX idx_daily_activities_user_date ON daily_activities(user_id, activity_date);
CREATE INDEX idx_daily_activities_date ON daily_activities(activity_date);

CREATE TABLE activity_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- walk, run, hike, bike
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    steps INTEGER,
    distance_km DECIMAL(10,2),
    calories_burned INTEGER,
    duration_minutes INTEGER,
    average_speed_kmh DECIMAL(5,2),
    route_data JSONB, -- GPS coordinates
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_sessions_user ON activity_sessions(user_id);
CREATE INDEX idx_activity_sessions_time ON activity_sessions(start_time, end_time);
```

#### 4.2.2 Activity Score Calculation
**Algorithm:**
```javascript
function calculateActivityScore(dailyData) {
    const weights = {
        steps: 0.4,        // 40% weight
        calories: 0.2,     // 20% weight
        activeMinutes: 0.2, // 20% weight
        heartPoints: 0.2    // 20% weight
    };
    
    const goals = {
        steps: 10000,
        calories: 500,
        activeMinutes: 60,
        heartPoints: 30
    };
    
    const score = 
        (dailyData.steps / goals.steps * 100 * weights.steps) +
        (dailyData.calories / goals.calories * 100 * weights.calories) +
        (dailyData.activeMinutes / goals.activeMinutes * 100 * weights.activeMinutes) +
        (dailyData.heartPoints / goals.heartPoints * 100 * weights.heartPoints);
    
    return Math.min(Math.round(score), 100);
}
```

---

### 4.3 Rewards & Coins Module

#### 4.3.1 SSG Coins System
**Earning Mechanisms:**
- **Steps:** 10 steps = 1 coin
- **Daily Goals:** Bonus 50 coins for hitting 10k steps
- **Weekly Streak:** 100 coins for 7-day streak
- **Challenges:** Variable coins based on difficulty
- **Referrals:** 500 coins per successful referral
- **PRO Members:** 2x coin multiplier

**Database Schema:**
```sql
CREATE TABLE coin_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- earned, spent, bonus, refund
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    source VARCHAR(100), -- steps, challenge, referral, purchase
    source_id UUID, -- Reference to challenge_id, order_id, etc.
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coin_transactions_user ON coin_transactions(user_id);
CREATE INDEX idx_coin_transactions_created ON coin_transactions(created_at);

CREATE TABLE coin_earning_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name VARCHAR(100) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- steps, goal, streak, challenge
    coins_per_unit INTEGER NOT NULL,
    minimum_threshold INTEGER,
    maximum_daily_coins INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    pro_multiplier DECIMAL(3,2) DEFAULT 1.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4.3.2 Coin Redemption Flow
**Process:**
```
1. User browses Shopify store in app
2. User selects product to redeem
3. App calculates coin value (1 coin = ₹1 equivalent)
4. User confirms redemption
5. Backend creates Shopify discount code
6. Discount code applied to order
7. Order placed with reduced/zero payment
8. Coins deducted from user balance
9. Order confirmation sent
```

**API Implementation:**
```javascript
// Calculate redemption value
POST /api/v1/rewards/calculate-redemption
{
  "productId": "shopify_product_id",
  "variant": "size_l",
  "coinsToRedeem": 500
}

Response:
{
  "productPrice": 999,
  "coinValue": 500,
  "finalPrice": 499,
  "discountCode": "WALKFIT500",
  "discountPercentage": 50.05
}

// Redeem coins for product
POST /api/v1/rewards/redeem
{
  "productId": "shopify_product_id",
  "variant": "size_l",
  "coinsToRedeem": 500,
  "shippingAddress": { address_object }
}

Response:
{
  "success": true,
  "orderId": "shopify_order_id",
  "transactionId": "uuid",
  "coinsDeducted": 500,
  "remainingCoins": 1250,
  "trackingNumber": "TRACK123"
}
```

---

## 5. Shopify Integration

### 5.1 Shopify Setup & Configuration

#### 5.1.1 Shopify App Creation
```
1. Create Custom Shopify App
   - Navigate to Shopify Admin > Apps > Develop Apps
   - Create new app: "WalkFit Backend"
   - Generate Admin API credentials
   - Enable Storefront API access

2. Required API Scopes:
   - read_products, write_products
   - read_orders, write_orders
   - read_customers, write_customers
   - read_inventory, write_inventory
   - read_price_rules, write_price_rules
   - read_discounts, write_discounts

3. Webhook Subscriptions:
   - orders/create
   - orders/updated
   - orders/cancelled
   - products/create
   - products/update
   - inventory_levels/update
```

#### 5.1.2 Shopify Credentials Management
```javascript
// Environment Variables
SHOPIFY_SHOP_NAME=walkfit.myshopify.com
SHOPIFY_API_KEY=shppa_xxxxxxxxxxxxx
SHOPIFY_API_SECRET_KEY=shpss_xxxxxxxxxxxxx
SHOPIFY_ACCESS_TOKEN=shpat_xxxxxxxxxxxxx
SHOPIFY_STOREFRONT_TOKEN=xxxxxxxxxxxxxxxxxx
```

### 5.2 Product Management Integration

#### 5.2.1 Product Sync
**Sync Shopify products to WalkFit database for offline access and faster loading:**

```javascript
// Shopify Product Fetch
const Shopify = require('shopify-api-node');

const shopify = new Shopify({
    shopName: process.env.SHOPIFY_SHOP_NAME,
    apiKey: process.env.SHOPIFY_API_KEY,
    password: process.env.SHOPIFY_ACCESS_TOKEN
});

async function syncProducts() {
    try {
        // Fetch all products from Shopify
        const products = await shopify.product.list({ limit: 250 });
        
        for (const product of products) {
            await db.query(`
                INSERT INTO products (
                    shopify_product_id,
                    title,
                    description,
                    vendor,
                    product_type,
                    handle,
                    images,
                    variants,
                    tags,
                    price_min,
                    price_max,
                    coin_value,
                    is_available,
                    updated_at
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
                ON CONFLICT (shopify_product_id) 
                DO UPDATE SET
                    title = $2,
                    description = $3,
                    variants = $8,
                    price_min = $10,
                    price_max = $11,
                    is_available = $13,
                    updated_at = NOW()
            `, [
                product.id,
                product.title,
                product.body_html,
                product.vendor,
                product.product_type,
                product.handle,
                JSON.stringify(product.images),
                JSON.stringify(product.variants),
                JSON.stringify(product.tags),
                Math.min(...product.variants.map(v => v.price)),
                Math.max(...product.variants.map(v => v.price)),
                calculateCoinValue(product),
                product.variants.some(v => v.inventory_quantity > 0)
            ]);
        }
        
        console.log('Product sync completed');
    } catch (error) {
        console.error('Product sync error:', error);
    }
}

// Run sync every 1 hour
setInterval(syncProducts, 3600000);
```

**Database Schema:**
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopify_product_id BIGINT UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    vendor VARCHAR(255),
    product_type VARCHAR(255),
    handle VARCHAR(255),
    images JSONB,
    variants JSONB NOT NULL,
    tags JSONB,
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2),
    coin_value INTEGER, -- Suggested coin redemption value
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    category VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_shopify_id ON products(shopify_product_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured, is_available);
```

#### 5.2.2 Product Display in App
```javascript
// API Endpoint: Get Products
GET /api/v1/store/products?category=fitness&page=1&limit=20

Response:
{
  "success": true,
  "products": [
    {
      "id": "uuid",
      "shopifyProductId": 7234567890,
      "title": "Premium Running Shoes",
      "description": "High-performance running shoes",
      "images": [
        "https://cdn.shopify.com/image1.jpg",
        "https://cdn.shopify.com/image2.jpg"
      ],
      "variants": [
        {
          "id": 43234567890,
          "title": "Size 9",
          "price": 3999.00,
          "coinValue": 3999,
          "available": true
        }
      ],
      "priceRange": {
        "min": 3999.00,
        "max": 4999.00
      },
      "coinValueRange": {
        "min": 3999,
        "max": 4999
      },
      "category": "footwear",
      "vendor": "Nike",
      "isFeatured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 5,
    "totalProducts": 98
  }
}
```

### 5.3 Order Management Integration

#### 5.3.1 Order Creation Flow
```javascript
// Create Order with Coin Redemption
async function createShopifyOrder(orderData) {
    try {
        // 1. Validate user coins balance
        const user = await getUserById(orderData.userId);
        if (user.ssg_coins_balance < orderData.coinsToRedeem) {
            throw new Error('Insufficient coins');
        }
        
        // 2. Create discount code in Shopify
        const discountCode = await createDiscountCode({
            code: `WALKFIT${Date.now()}`,
            value: orderData.coinsToRedeem,
            type: 'fixed_amount'
        });
        
        // 3. Create draft order in Shopify
        const draftOrder = await shopify.draftOrder.create({
            line_items: orderData.items.map(item => ({
                variant_id: item.variantId,
                quantity: item.quantity
            })),
            customer: {
                id: user.shopify_customer_id
            },
            shipping_address: orderData.shippingAddress,
            applied_discount: {
                value: orderData.coinsToRedeem,
                value_type: 'fixed_amount',
                title: 'SSG Coins Redemption'
            },
            note: `Coins Redeemed: ${orderData.coinsToRedeem}`
        });
        
        // 4. Complete order and process payment (if remaining amount)
        const completedOrder = await shopify.draftOrder.complete(
            draftOrder.id,
            { payment_pending: orderData.remainingAmount > 0 }
        );
        
        // 5. Deduct coins from user balance
        await deductCoins(user.id, orderData.coinsToRedeem, {
            source: 'order',
            sourceId: completedOrder.id,
            description: `Order #${completedOrder.order_number}`
        });
        
        // 6. Store order in WalkFit database
        await db.query(`
            INSERT INTO orders (
                user_id,
                shopify_order_id,
                order_number,
                total_amount,
                coins_redeemed,
                payment_amount,
                status,
                items,
                shipping_address
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
            user.id,
            completedOrder.id,
            completedOrder.order_number,
            completedOrder.total_price,
            orderData.coinsToRedeem,
            orderData.remainingAmount,
            'pending',
            JSON.stringify(orderData.items),
            JSON.stringify(orderData.shippingAddress)
        ]);
        
        return {
            success: true,
            orderId: completedOrder.id,
            orderNumber: completedOrder.order_number,
            trackingUrl: completedOrder.tracking_url
        };
        
    } catch (error) {
        console.error('Order creation error:', error);
        throw error;
    }
}
```

**Database Schema:**
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    shopify_order_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    coins_redeemed INTEGER DEFAULT 0,
    payment_amount DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) NOT NULL, -- pending, confirmed, shipped, delivered, cancelled
    payment_status VARCHAR(50), -- pending, paid, failed, refunded
    items JSONB NOT NULL,
    shipping_address JSONB NOT NULL,
    tracking_number VARCHAR(100),
    tracking_url TEXT,
    fulfilled_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_shopify_id ON orders(shopify_order_id);
CREATE INDEX idx_orders_status ON orders(status);
```

#### 5.3.2 Shopify Webhooks Handler
```javascript
// Webhook endpoint to receive Shopify order updates
app.post('/webhooks/shopify/orders/updated', async (req, res) => {
    try {
        // Verify webhook authenticity
        const hmac = req.headers['x-shopify-hmac-sha256'];
        const verified = verifyShopifyWebhook(req.body, hmac);
        
        if (!verified) {
            return res.status(401).send('Unauthorized');
        }
        
        const orderData = req.body;
        
        // Update order in database
        await db.query(`
            UPDATE orders 
            SET 
                status = $1,
                tracking_number = $2,
                tracking_url = $3,
                fulfilled_at = $4,
                updated_at = NOW()
            WHERE shopify_order_id = $5
        `, [
            mapShopifyStatus(orderData.fulfillment_status),
            orderData.tracking_number,
            orderData.tracking_url,
            orderData.fulfilled_at,
            orderData.id
        ]);
        
        // Send push notification to user
        const order = await getOrderByShopifyId(orderData.id);
        await sendPushNotification(order.user_id, {
            title: 'Order Update',
            body: `Your order #${orderData.order_number} has been ${orderData.fulfillment_status}`,
            data: { orderId: order.id, type: 'order_update' }
        });
        
        res.status(200).send('OK');
    } catch (error) {
        console.error('Webhook processing error:', error);
        res.status(500).send('Error');
    }
});

function verifyShopifyWebhook(data, hmac) {
    const hash = crypto
        .createHmac('sha256', process.env.SHOPIFY_WEBHOOK_SECRET)
        .update(JSON.stringify(data))
        .digest('base64');
    return hash === hmac;
}
```

### 5.4 Customer Sync

#### 5.4.1 WalkFit User to Shopify Customer Sync
```javascript
async function syncUserToShopify(user) {
    try {
        let shopifyCustomer;
        
        if (user.shopify_customer_id) {
            // Update existing customer
            shopifyCustomer = await shopify.customer.update(
                user.shopify_customer_id,
                {
                    email: user.email,
                    first_name: user.name.split(' ')[0],
                    last_name: user.name.split(' ').slice(1).join(' '),
                    phone: user.phone_number,
                    tags: `walkfit_user,coins_${user.ssg_coins_balance}`
                }
            );
        } else {
            // Create new customer
            shopifyCustomer = await shopify.customer.create({
                email: user.email,
                first_name: user.name.split(' ')[0],
                last_name: user.name.split(' ').slice(1).join(' '),
                phone: user.phone_number,
                tags: 'walkfit_user',
                note: `WalkFit User ID: ${user.id}`,
                verified_email: true
            });
            
            // Save Shopify customer ID
            await db.query(
                'UPDATE users SET shopify_customer_id = $1 WHERE id = $2',
                [shopifyCustomer.id, user.id]
            );
        }
        
        return shopifyCustomer;
    } catch (error) {
        console.error('Customer sync error:', error);
        throw error;
    }
}
```

### 5.5 Discount Code Management

#### 5.5.1 Dynamic Discount Code Generation
```javascript
async function createDiscountCode(coinsAmount) {
    try {
        const code = `WALKFIT${Date.now()}`;
        
        // Create price rule
        const priceRule = await shopify.priceRule.create({
            title: `WalkFit Coins Redemption - ${code}`,
            target_type: 'line_item',
            target_selection: 'all',
            allocation_method: 'across',
            value_type: 'fixed_amount',
            value: `-${coinsAmount}`,
            customer_selection: 'all',
            usage_limit: 1,
            starts_at: new Date().toISOString()
        });
        
        // Create discount code
        const discountCode = await shopify.discountCode.create(
            priceRule.id,
            { code: code }
        );
        
        return {
            code: code,
            priceRuleId: priceRule.id,
            value: coinsAmount
        };
    } catch (error) {
        console.error('Discount code creation error:', error);
        throw error;
    }
}
```

---

## 6. Database Schema

### 6.1 Complete Database Design

```sql
-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    height_cm INTEGER,
    weight_kg DECIMAL(5,2),
    
    -- Subscription
    is_pro_member BOOLEAN DEFAULT FALSE,
    pro_subscription_expires_at TIMESTAMP,
    subscription_type VARCHAR(50), -- monthly, yearly
    
    -- Coins & Stats
    ssg_coins_balance INTEGER DEFAULT 0,
    total_steps BIGINT DEFAULT 0,
    total_distance_km DECIMAL(10,2) DEFAULT 0,
    total_calories BIGINT DEFAULT 0,
    total_coins_earned BIGINT DEFAULT 0,
    total_coins_spent BIGINT DEFAULT 0,
    
    -- Shopify Integration
    shopify_customer_id BIGINT,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_auth_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- google, facebook, apple
    provider_user_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_user_id)
);

-- ============================================
-- ACTIVITY TRACKING
-- ============================================

CREATE TABLE daily_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    steps INTEGER DEFAULT 0,
    distance_km DECIMAL(10,2) DEFAULT 0,
    calories_burned INTEGER DEFAULT 0,
    active_minutes INTEGER DEFAULT 0,
    heart_points INTEGER DEFAULT 0,
    activity_score INTEGER DEFAULT 0,
    coins_earned INTEGER DEFAULT 0,
    source VARCHAR(50), -- healthkit, googlefit, manual
    synced_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, activity_date)
);

CREATE TABLE activity_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    steps INTEGER,
    distance_km DECIMAL(10,2),
    calories_burned INTEGER,
    duration_minutes INTEGER,
    average_speed_kmh DECIMAL(5,2),
    route_data JSONB,
    weather_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- CHALLENGES
-- ============================================

CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    challenge_type VARCHAR(50) NOT NULL, -- steps, distance, streak, custom
    image_url TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    
    -- Goals
    goal_type VARCHAR(50), -- total_steps, daily_steps, distance, etc.
    goal_value INTEGER NOT NULL,
    
    -- Rewards
    reward_coins INTEGER DEFAULT 0,
    reward_badge_id UUID,
    
    -- Metadata
    difficulty_level VARCHAR(20), -- easy, medium, hard
    category VARCHAR(50),
    is_featured BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    max_participants INTEGER,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE challenge_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_progress INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    coins_earned INTEGER DEFAULT 0,
    rank INTEGER,
    UNIQUE(challenge_id, user_id)
);

-- ============================================
-- COINS & TRANSACTIONS
-- ============================================

CREATE TABLE coin_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    transaction_type VARCHAR(50) NOT NULL, -- earned, spent, bonus, refund
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    source VARCHAR(100),
    source_id UUID,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SHOPIFY INTEGRATION
-- ============================================

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shopify_product_id BIGINT UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    vendor VARCHAR(255),
    product_type VARCHAR(255),
    handle VARCHAR(255),
    images JSONB,
    variants JSONB NOT NULL,
    tags JSONB,
    price_min DECIMAL(10,2),
    price_max DECIMAL(10,2),
    coin_value INTEGER,
    is_featured BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    category VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    shopify_order_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    coins_redeemed INTEGER DEFAULT 0,
    payment_amount DECIMAL(10,2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'INR',
    status VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50),
    items JSONB NOT NULL,
    shipping_address JSONB NOT NULL,
    tracking_number VARCHAR(100),
    tracking_url TEXT,
    fulfilled_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REWARDS
-- ============================================

CREATE TABLE badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon_url TEXT,
    badge_type VARCHAR(50), -- achievement, milestone, special
    requirement_type VARCHAR(50), -- steps, challenges, streak
    requirement_value INTEGER,
    rarity VARCHAR(20), -- common, rare, epic, legendary
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- ============================================
-- SOCIAL FEATURES
-- ============================================

CREATE TABLE friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    friend_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- pending, accepted, blocked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, friend_id)
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(50), -- challenge, reward, order, social
    data JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE push_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    device_type VARCHAR(20), -- ios, android
    token TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, token)
);

-- ============================================
-- INDEXES
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_shopify_customer_id ON users(shopify_customer_id);
CREATE INDEX idx_users_pro_member ON users(is_pro_member, pro_subscription_expires_at);

-- Activities
CREATE INDEX idx_daily_activities_user_date ON daily_activities(user_id, activity_date);
CREATE INDEX idx_daily_activities_date ON daily_activities(activity_date);
CREATE INDEX idx_activity_sessions_user ON activity_sessions(user_id);
CREATE INDEX idx_activity_sessions_time ON activity_sessions(start_time, end_time);

-- Challenges
CREATE INDEX idx_challenges_dates ON challenges(start_date, end_date);
CREATE INDEX idx_challenge_participants_user ON challenge_participants(user_id);
CREATE INDEX idx_challenge_participants_challenge ON challenge_participants(challenge_id);

-- Transactions
CREATE INDEX idx_coin_transactions_user ON coin_transactions(user_id);
CREATE INDEX idx_coin_transactions_created ON coin_transactions(created_at);

-- Products & Orders
CREATE INDEX idx_products_shopify_id ON products(shopify_product_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured, is_available);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_shopify_id ON orders(shopify_order_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Notifications
CREATE INDEX idx_notifications_user_created ON notifications(user_id, created_at);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
```

---

## 7. API Specifications

### 7.1 API Overview

**Base URL:** `https://api.walkfit.in/v1`  
**Authentication:** Bearer Token (JWT)  
**Content-Type:** application/json

### 7.2 Authentication APIs

#### 7.2.1 Register User
```http
POST /auth/register
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe",
  "phoneNumber": "+919876543210"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "userId": "uuid",
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "profileImageUrl": null,
      "ssgCoinsBalance": 0,
      "isProMember": false
    }
  }
}

Error: 400 Bad Request
{
  "success": false,
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "Email already registered"
  }
}
```

#### 7.2.2 Login
```http
POST /auth/login
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "user": { user_object }
  }
}
```

#### 7.2.3 Social Login
```http
POST /auth/social-login
Content-Type: application/json

Request:
{
  "provider": "google",
  "idToken": "google_id_token",
  "accessToken": "google_access_token"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "user": { user_object },
    "isNewUser": true
  }
}
```

### 7.3 Activity APIs

#### 7.3.1 Sync Steps
```http
POST /activities/steps/sync
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "date": "2026-02-15",
  "steps": 8750,
  "source": "healthkit",
  "startTime": "2026-02-15T00:00:00Z",
  "endTime": "2026-02-15T23:59:59Z",
  "distance": 6.2,
  "calories": 392
}

Response: 200 OK
{
  "success": true,
  "data": {
    "date": "2026-02-15",
    "totalSteps": 8750,
    "coinsEarned": 87,
    "activityScore": 72,
    "dailyGoalProgress": 87.5,
    "newBadgesEarned": []
  }
}
```

#### 7.3.2 Get Activity Summary
```http
GET /activities/summary?period=week
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "period": "week",
    "totalSteps": 67234,
    "totalDistance": 48.2,
    "totalCalories": 3120,
    "averageSteps": 9605,
    "activeMinutes": 336,
    "heartPoints": 196,
    "coinsEarned": 672,
    "dailyData": [
      {
        "date": "2026-02-09",
        "steps": 8234,
        "distance": 5.9,
        "calories": 392,
        "activityScore": 68
      }
      // ... more days
    ]
  }
}
```

### 7.4 Store & Rewards APIs

#### 7.4.1 Get Products
```http
GET /store/products?category=fitness&page=1&limit=20&sort=featured
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid",
        "shopifyProductId": 7234567890,
        "title": "Premium Running Shoes",
        "description": "High-performance...",
        "images": ["url1", "url2"],
        "variants": [
          {
            "id": 43234567890,
            "title": "Size 9",
            "price": 3999.00,
            "coinValue": 3999,
            "available": true
          }
        ],
        "priceRange": {
          "min": 3999.00,
          "max": 4999.00
        },
        "coinValueRange": {
          "min": 3999,
          "max": 4999
        },
        "category": "footwear",
        "vendor": "Nike",
        "isFeatured": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalPages": 5,
      "totalProducts": 98
    }
  }
}
```

#### 7.4.2 Create Order with Coin Redemption
```http
POST /store/orders
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "items": [
    {
      "productId": "uuid",
      "variantId": 43234567890,
      "quantity": 1
    }
  ],
  "coinsToRedeem": 500,
  "shippingAddress": {
    "name": "John Doe",
    "phone": "+919876543210",
    "address1": "123 Main St",
    "address2": "Apt 4B",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zip": "400001",
    "country": "India"
  },
  "paymentMethod": "razorpay"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "orderId": "uuid",
    "shopifyOrderId": 7890123456,
    "orderNumber": "WF1001",
    "totalAmount": 999.00,
    "coinsRedeemed": 500,
    "paymentAmount": 499.00,
    "discountCode": "WALKFIT500",
    "status": "pending",
    "estimatedDelivery": "2026-02-20",
    "paymentUrl": "https://razorpay.com/checkout/xyz"
  }
}
```

#### 7.4.3 Get Order Details
```http
GET /store/orders/{orderId}
Authorization: Bearer {token}

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "uuid",
    "orderNumber": "WF1001",
    "status": "shipped",
    "paymentStatus": "paid",
    "totalAmount": 999.00,
    "coinsRedeemed": 500,
    "paymentAmount": 499.00,
    "items": [
      {
        "productTitle": "Premium Running Shoes",
        "variant": "Size 9",
        "quantity": 1,
        "price": 999.00,
        "image": "url"
      }
    ],
    "shippingAddress": { address_object },
    "trackingNumber": "TRACK123456",
    "trackingUrl": "https://tracking.com/TRACK123456",
    "orderedAt": "2026-02-15T10:30:00Z",
    "shippedAt": "2026-02-16T14:20:00Z",
    "estimatedDelivery": "2026-02-20"
  }
}
```

### 7.5 Complete API Endpoints List

```
Authentication:
POST   /auth/register
POST   /auth/login
POST   /auth/social-login
POST   /auth/refresh-token
POST   /auth/forgot-password
POST   /auth/reset-password
POST   /auth/logout

User Profile:
GET    /users/me
PUT    /users/me
POST   /users/me/avatar
GET    /users/me/stats
DELETE /users/me

Activity Tracking:
POST   /activities/steps/sync
GET    /activities/summary
GET    /activities/history
POST   /activities/sessions
GET    /activities/sessions/{id}
GET    /activities/leaderboard

Challenges:
GET    /challenges
GET    /challenges/{id}
POST   /challenges/{id}/join
GET    /challenges/my-challenges
GET    /challenges/{id}/leaderboard

Coins & Rewards:
GET    /coins/balance
GET    /coins/transactions
POST   /coins/transfer

Store:
GET    /store/products
GET    /store/products/{id}
GET    /store/categories
POST   /store/orders
GET    /store/orders
GET    /store/orders/{id}
POST   /store/orders/{id}/cancel

Badges:
GET    /badges
GET    /badges/my-badges
GET    /badges/{id}

Social:
GET    /friends
POST   /friends/request
POST   /friends/accept
POST   /friends/reject
DELETE /friends/{id}

Notifications:
GET    /notifications
PUT    /notifications/{id}/read
PUT    /notifications/read-all
POST   /push-tokens

Corporate (B2B):
POST   /corporate/teams
GET    /corporate/teams/{id}/members
GET    /corporate/teams/{id}/challenges
GET    /corporate/teams/{id}/analytics
```

---

## 8. Security & Privacy

### 8.1 Authentication & Authorization

#### JWT Token Structure
```javascript
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "uuid",
    "email": "user@example.com",
    "role": "user", // user, admin, corporate
    "isProMember": false,
    "iat": 1708001234,
    "exp": 1708087634 // 24 hours
  }
}
```

#### Token Refresh Mechanism
- Access Token: 24 hours validity
- Refresh Token: 30 days validity
- Auto-refresh before expiration
- Revoke on logout/password change

### 8.2 Data Security

#### Encryption
- **In Transit:** TLS 1.3 for all API calls
- **At Rest:** AES-256 encryption for sensitive data
- **Passwords:** bcrypt with salt rounds = 12
- **API Keys:** Environment variables, never in code

#### PII Protection
```javascript
// Anonymized logging
function sanitizeLogData(data) {
    return {
        ...data,
        email: data.email?.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
        phoneNumber: data.phoneNumber?.replace(/(.{2})(.*)(.{2})/, '$1***$3'),
        password: undefined,
        token: undefined
    };
}
```

### 8.3 GDPR Compliance

#### User Rights
1. **Right to Access:** Download all personal data
2. **Right to Rectification:** Update profile info
3. **Right to Erasure:** Delete account permanently
4. **Right to Data Portability:** Export in JSON format

#### Data Retention
- **Active Users:** Indefinite storage
- **Inactive Users (2 years):** Automated deletion notice
- **Deleted Accounts:** 30-day grace period, then permanent deletion
- **Anonymized Analytics:** Retained indefinitely

### 8.4 Payment Security

#### PCI DSS Compliance
- No card data stored on servers
- Payment gateway handles all card information
- 3D Secure authentication for transactions
- Fraud detection integration

---

## 9. Third-Party Integrations

### 9.1 Health Platforms

#### Apple HealthKit (iOS)
```swift
// Request permissions
let healthStore = HKHealthStore()
let stepType = HKQuantityType.quantityType(forIdentifier: .stepCount)!

healthStore.requestAuthorization(toShare: [], read: [stepType]) { success, error in
    if success {
        // Fetch and sync steps
    }
}
```

#### Google Fit (Android)
```kotlin
val fitnessOptions = FitnessOptions.builder()
    .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
    .build()

GoogleSignIn.requestPermissions(activity, fitnessOptions)
```

### 9.2 Payment Gateways

#### Razorpay Integration
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
const order = await razorpay.orders.create({
    amount: 49900, // in paise
    currency: 'INR',
    receipt: `order_${orderId}`,
    payment_capture: 1
});
```

### 9.3 Analytics

#### Mixpanel Events
```javascript
// Track user events
mixpanel.track('Steps Synced', {
    steps: 8750,
    source: 'healthkit',
    coinsEarned: 87
});

mixpanel.track('Product Viewed', {
    productId: 'uuid',
    productName: 'Running Shoes',
    price: 3999
});

mixpanel.track('Order Placed', {
    orderId: 'uuid',
    totalAmount: 999,
    coinsRedeemed: 500
});
```

### 9.4 Push Notifications

#### Firebase Cloud Messaging
```javascript
const admin = require('firebase-admin');

async function sendPushNotification(userId, notification) {
    const tokens = await getUserPushTokens(userId);
    
    const message = {
        notification: {
            title: notification.title,
            body: notification.body
        },
        data: notification.data,
        tokens: tokens
    };
    
    const response = await admin.messaging().sendMulticast(message);
    return response;
}
```

---

## 10. Deployment & Infrastructure

### 10.1 Cloud Infrastructure

#### AWS Architecture
```
┌─────────────────────────────────────────┐
│           Route 53 (DNS)                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│     CloudFront (CDN) + WAF              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Application Load Balancer              │
└──────────────┬──────────────────────────┘
               │
         ┌─────┴─────┐
         │           │
         ▼           ▼
    ┌────────┐  ┌────────┐
    │  ECS   │  │  ECS   │  (Auto-scaling containers)
    │Container│  │Container│
    └────┬───┘  └───┬────┘
         │          │
         └────┬─────┘
              │
              ▼
    ┌──────────────────┐
    │   RDS PostgreSQL │
    │   (Multi-AZ)     │
    └──────────────────┘
    
    ┌──────────────────┐
    │  ElastiCache     │
    │  (Redis)         │
    └──────────────────┘
    
    ┌──────────────────┐
    │  S3 (Storage)    │
    └──────────────────┘
```

### 10.2 CI/CD Pipeline

#### GitHub Actions Workflow
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t walkfit-api .
      - name: Push to ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin
          docker tag walkfit-api:latest ecr.amazonaws.com/walkfit-api:latest
          docker push ecr.amazonaws.com/walkfit-api:latest
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster walkfit-prod --service api --force-new-deployment
```

### 10.3 Environment Configuration

```bash
# Production Environment Variables

# Application
NODE_ENV=production
PORT=3000
API_VERSION=v1

# Database
DB_HOST=walkfit-prod.xxxxx.ap-south-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=walkfit_prod
DB_USER=walkfit_admin
DB_PASSWORD=secure_password
DB_SSL=true

# Redis
REDIS_HOST=walkfit-cache.xxxxx.cache.amazonaws.com
REDIS_PORT=6379

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=30d

# Shopify
SHOPIFY_SHOP_NAME=walkfit.myshopify.com
SHOPIFY_API_KEY=shppa_xxxxx
SHOPIFY_API_SECRET=shpss_xxxxx
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx

# Payment Gateway
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# AWS
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
S3_BUCKET=walkfit-assets-prod

# Firebase
FIREBASE_PROJECT_ID=walkfit-prod
FIREBASE_PRIVATE_KEY=xxxxx
FIREBASE_CLIENT_EMAIL=xxxxx

# Analytics
MIXPANEL_TOKEN=xxxxx
```

### 10.4 Monitoring & Logging

#### CloudWatch Metrics
- API Response Time
- Error Rate
- Request Count
- Database Connections
- Cache Hit Rate

#### Alerts
```javascript
// Example: High Error Rate Alert
{
  "AlarmName": "HighErrorRate",
  "MetricName": "5XXError",
  "Threshold": 10,
  "EvaluationPeriods": 2,
  "ComparisonOperator": "GreaterThanThreshold",
  "AlarmActions": ["arn:aws:sns:ap-south-1:xxx:DevOpsTeam"]
}
```

---

## 11. Testing Strategy

### 11.1 Test Pyramid

```
         ┌─────────────────┐
         │   E2E Tests     │  10%
         │  (Selenium)     │
         └─────────────────┘
       ┌───────────────────────┐
       │  Integration Tests    │  20%
       │   (Jest + Supertest)  │
       └───────────────────────┘
    ┌──────────────────────────────┐
    │      Unit Tests              │  70%
    │  (Jest + React Testing Lib)  │
    └──────────────────────────────┘
```

### 11.2 Unit Testing

```javascript
// Example: Coin Calculation Test
describe('Coin Calculation', () => {
    test('should calculate coins for 10,000 steps', () => {
        const coins = calculateCoinsForSteps(10000);
        expect(coins).toBe(1000); // 10 steps = 1 coin
    });
    
    test('should apply PRO multiplier', () => {
        const coins = calculateCoinsForSteps(10000, true);
        expect(coins).toBe(2000); // 2x for PRO
    });
});
```

### 11.3 Integration Testing

```javascript
// Example: Order Creation Test
describe('POST /store/orders', () => {
    test('should create order with coin redemption', async () => {
        const response = await request(app)
            .post('/api/v1/store/orders')
            .set('Authorization', `Bearer ${testToken}`)
            .send({
                items: [{ productId: 'uuid', variantId: 123, quantity: 1 }],
                coinsToRedeem: 500,
                shippingAddress: testAddress
            });
        
        expect(response.status).toBe(201);
        expect(response.body.data.coinsRedeemed).toBe(500);
        expect(response.body.data.orderId).toBeDefined();
    });
});
```

### 11.4 Load Testing

```javascript
// k6 Load Test Script
import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '2m', target: 100 },  // Ramp up
        { duration: '5m', target: 1000 }, // Peak
        { duration: '2m', target: 0 }     // Ramp down
    ]
};

export default function() {
    let response = http.get('https://api.walkfit.in/v1/products');
    check(response, {
        'status is 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500
    });
}
```

---

## 12. Timeline & Milestones

### 12.1 Development Phases

#### Phase 1: Foundation (Weeks 1-4)
- [ ] Backend API setup
- [ ] Database schema implementation
- [ ] Authentication system
- [ ] Basic user management
- [ ] Shopify app creation

#### Phase 2: Core Features (Weeks 5-10)
- [ ] Activity tracking (iOS & Android)
- [ ] Step counting integration
- [ ] Coin earning system
- [ ] Daily goals & progress
- [ ] Shopify product sync

#### Phase 3: Store Integration (Weeks 11-14)
- [ ] Product catalog in app
- [ ] Shopping cart
- [ ] Coin redemption flow
- [ ] Order management
- [ ] Payment gateway integration

#### Phase 4: Social & Gamification (Weeks 15-18)
- [ ] Challenges system
- [ ] Leaderboards
- [ ] Badges & achievements
- [ ] Friend system
- [ ] Push notifications

#### Phase 5: Testing & QA (Weeks 19-22)
- [ ] Unit testing (target: 80% coverage)
- [ ] Integration testing
- [ ] Load testing
- [ ] Security audit
- [ ] Bug fixes

#### Phase 6: Launch Preparation (Weeks 23-24)
- [ ] App Store submission (iOS)
- [ ] Play Store submission (Android)
- [ ] Marketing materials
- [ ] Beta testing
- [ ] Production deployment

### 12.2 Key Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Backend API MVP | Week 4 | Not Started |
| iOS Alpha | Week 10 | Not Started |
| Android Alpha | Week 10 | Not Started |
| Shopify Integration Complete | Week 14 | Not Started |
| Beta Release | Week 20 | Not Started |
| Production Launch | Week 24 | Not Started |

---

## 13. Appendices

### 13.1 Glossary

- **SSG Coins:** In-app virtual currency earned through activity
- **Activity Score:** Daily fitness metric (0-100)
- **Heart Points:** Measure of cardiovascular activity
- **PRO Member:** Premium subscription tier
- **Shopify Storefront API:** API for headless commerce
- **Draft Order:** Shopify order before final checkout

### 13.2 References

- [Shopify API Documentation](https://shopify.dev/api)
- [Apple HealthKit](https://developer.apple.com/healthkit/)
- [Google Fit](https://developers.google.com/fit)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [GDPR Compliance Guide](https://gdpr.eu)

### 13.3 Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-02-15 | Initial draft | Development Team |

---

**Document Status:** Draft  
**Next Review Date:** 2026-03-01  
**Approval Required:** Product Manager, Tech Lead, Security Team

---

*End of Technical Specification Document*
