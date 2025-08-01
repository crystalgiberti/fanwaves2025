# 🔐 WooCommerce Secure Integration Setup

## 🎯 Overview
Your Fan Waves site is ready for full WooCommerce integration! This guide will connect your site securely to your BlueHost WordPress/WooCommerce store so you can manage products directly through WooCommerce.

## 📋 Prerequisites
- ✅ WordPress site on BlueHost
- ✅ WooCommerce plugin installed and activated
- ✅ Domain: fanwaves.fun (or subdomain)
- ✅ SSL certificate enabled

## 🛠️ Step 1: Generate WooCommerce API Keys

### In your WordPress Admin:
1. **Login to WordPress Admin** on BlueHost
2. **Navigate to**: WooCommerce → Settings → Advanced → REST API
3. **Click "Add Key"**
4. **Configure the key**:
   - **Description**: `Fan Waves Frontend`
   - **User**: Select your admin user
   - **Permissions**: `Read/Write`
5. **Click "Generate API Key"**
6. **Copy the keys** (save them securely!):
   - Consumer Key (starts with `ck_`)
   - Consumer Secret (starts with `cs_`)

## 🔧 Step 2: Configure Environment Variables

### Option A: Using Netlify Environment Variables (Recommended)
If deploying to Netlify, set these in your Netlify dashboard:

```bash
WOOCOMMERCE_URL=https://fanwaves.fun
WOOCOMMERCE_CONSUMER_KEY=ck_your_actual_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_actual_consumer_secret_here
WOOCOMMERCE_VERSION=wc/v3
WOOCOMMERCE_WEBHOOK_SECRET=your_secure_webhook_secret
```

### Option B: Using BlueHost Environment Variables
1. **In BlueHost cPanel**:
   - Go to "Advanced" → "Node.js"
   - Set environment variables there

### Option C: For Development (.env file)
Create a `.env` file with:

```bash
# WooCommerce Configuration
WOOCOMMERCE_URL=https://fanwaves.fun
WOOCOMMERCE_CONSUMER_KEY=ck_your_actual_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_actual_consumer_secret_here
WOOCOMMERCE_VERSION=wc/v3
WOOCOMMERCE_WEBHOOK_SECRET=your_secure_webhook_secret_123

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://fanwaves.fun
NEXT_PUBLIC_API_URL=https://fanwaves.fun/api
```

## 🏗️ Step 3: Set Up Product Categories in WooCommerce

### Create these categories in WooCommerce Admin:

#### Team Categories (Assign IDs 100+):
- Kansas City Chiefs (ID: 100)
- Dallas Cowboys (ID: 101)
- New England Patriots (ID: 102)
- Green Bay Packers (ID: 103)
- Pittsburgh Steelers (ID: 104)
- Chicago Bears (ID: 105)
- Alabama Crimson Tide (ID: 200)
- Ohio State Buckeyes (ID: 201)
- LSU Tigers (ID: 202)
- Georgia Bulldogs (ID: 203)

#### Product Type Categories (IDs 10+):
- Jerseys (ID: 10)
- Hats & Caps (ID: 11)
- T-Shirts & Apparel (ID: 12)
- Accessories (ID: 13)
- Outerwear (ID: 14)
- Ladies Apparel (ID: 15)
- Pants & Shorts (ID: 16)

## 🔗 Step 4: Set Up Webhooks (Optional but Recommended)

### In WooCommerce → Settings → Advanced → Webhooks:
1. **Create webhook** for real-time updates
2. **Set Delivery URL**: `https://fanwaves.fun/api/webhooks/woocommerce`
3. **Select events**: 
   - Product created
   - Product updated
   - Product deleted
   - Order created
   - Order updated
4. **Set Secret**: Use the same webhook secret from env vars

## 🚀 Step 5: Deploy with Environment Variables

### If using the DevServerControl tool:
I can set the environment variables directly in your current setup:

```bash
WOOCOMMERCE_URL=https://fanwaves.fun
WOOCOMMERCE_CONSUMER_KEY=your_key_here
WOOCOMMERCE_CONSUMER_SECRET=your_secret_here
```

## 🧪 Step 6: Test the Connection

Once configured, your site will:
- ✅ **Fetch real products** from WooCommerce
- ✅ **Display accurate pricing** and inventory
- ✅ **Process orders** through WooCommerce
- ✅ **Sync with your admin panel**
- ✅ **Handle webhooks** for real-time updates

## 🔐 Security Best Practices

### ✅ What we've implemented:
- **API key validation** with Zod schemas
- **HTTPS only** connections
- **Environment variable** protection
- **Webhook signature** verification
- **Error handling** for failed connections
- **Rate limiting** protection

### 🛡️ Additional security:
- Keys are **never logged** or exposed
- **Separate keys** for production/development
- **Regular key rotation** recommended
- **IP restrictions** available in WooCommerce

## 📊 What You'll Get

### 🛍️ Product Management:
- **Add products** in WooCommerce admin
- **Assign to teams** via categories
- **Set pricing** and inventory
- **Upload images** and descriptions
- **Manage variations** (sizes, colors)

### 🎯 Frontend Integration:
- **Real product data** on your site
- **Live inventory** updates
- **Accurate pricing** display
- **Working shopping cart**
- **Order processing**

### 📈 Analytics:
- **Sales tracking** in WooCommerce
- **Customer data** management
- **Order fulfillment**
- **Inventory reports**

## 🚨 Troubleshooting

### Common Issues:
1. **"Invalid URL" error**: Check WOOCOMMERCE_URL format
2. **Authentication failed**: Verify API keys
3. **CORS issues**: Ensure proper domain setup
4. **SSL errors**: Confirm HTTPS is working

### Quick Fixes:
```bash
# Test your WooCommerce API manually:
curl -u "ck_key:cs_secret" https://fanwaves.fun/wp-json/wc/v3/products

# Verify SSL:
curl -I https://fanwaves.fun
```

## 📞 Next Steps

1. **Provide your WooCommerce URL and API keys**
2. **I'll configure the environment variables**
3. **Test the connection**
4. **Start adding your products in WooCommerce!**

---

## 🔥 Ready to Connect?

**Send me your:**
- WordPress/WooCommerce site URL
- Consumer Key (ck_...)
- Consumer Secret (cs_...)

**And I'll get everything connected securely!** 🚀
