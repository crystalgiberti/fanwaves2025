# How to Manage Products from WooCommerce

Your Fan Waves site now automatically fetches and displays real products from your WooCommerce store! Here's how to manage your products:

## 🛒 Where Products Appear

**On Your Main Site (fanwaves.fun):**
- **"Trending Now" section** - Shows your featured/popular products from WooCommerce
- **Collections pages** - Browse by category (NFL, NCAA, Hats, etc.)
- Products display with real prices, images, ratings, and stock status

**In Your WooCommerce Store (fanwaves.fun/shop/):**
- Full shopping cart and checkout functionality
- Complete product management
- Order processing and customer management

## 📝 How to Add/Edit Products

### 1. **Access Your WooCommerce Admin**
   - Go to: `https://fanwaves.fun/shop/wp-admin/`
   - Login with your WordPress admin credentials
   - Navigate to **Products** → **All Products**

### 2. **Add New Products**
   - Click **"Add New Product"**
   - Fill out product details:
     - **Product name** (appears on main site)
     - **Product description** (short description shows on main site)
     - **Regular price** and **Sale price**
     - **Product images** (first image shows on main site)
     - **Categories** (determines where it shows on main site)
     - **Tags** (for better organization)

### 3. **Make Products Featured**
   - Edit any product
   - Check the **"Featured Product"** checkbox
   - Featured products automatically appear in the "Trending Now" section

### 4. **Set Product Categories**
   Create categories that match your site structure:
   - **Hats & Caps** (ID: 11)
   - **Jerseys** (ID: 10) 
   - **Accessories** (ID: 13)
   - **T-Shirts & Apparel** (ID: 12)
   - **Outerwear** (ID: 14)
   - **Ladies Apparel** (ID: 15)

   **Team Categories:**
   - Kansas City Chiefs (ID: 100)
   - Dallas Cowboys (ID: 101)
   - Add more as needed

## 🔄 How Products Sync

**Automatic Updates:**
- When you add/edit products in WooCommerce, they automatically appear on your main site
- Price changes, stock updates, and new images sync in real-time
- No manual work required!

**What Syncs:**
- Product names and descriptions
- Prices (regular and sale prices)
- Product images
- Stock status
- Categories and tags
- Featured product status
- Customer ratings and reviews

## 🎯 Pro Tips

### **For Best Results:**
1. **Use high-quality images** - First image shows on main site
2. **Write compelling short descriptions** - These appear on product cards
3. **Set featured products** - These get prime placement
4. **Use proper categories** - Helps customers find products
5. **Keep stock status updated** - Out-of-stock products still show but with indicators

### **Managing Team Products:**
- Create team-specific categories (Chiefs, Cowboys, etc.)
- Use consistent naming: "Team Name - Product Type"
- Add team tags for better organization

### **Sales and Promotions:**
- Set sale prices in WooCommerce
- Products automatically show "Sale" badges
- Original prices show crossed out

## 🚨 Troubleshooting

**If products don't appear on main site:**
1. Check that products are published (not draft)
2. Ensure categories are set correctly
3. Verify WooCommerce API is working
4. Contact support if issues persist

**Product images not showing:**
1. Make sure images are uploaded to WooCommerce
2. Check image URLs are accessible
3. Ensure images are not too large (recommended: under 2MB)

## 📊 Current Setup

Your site is configured with:
- **WooCommerce Store:** https://fanwaves.fun/shop/
- **API Integration:** ✅ Connected
- **Categories:** Set up for NFL, NCAA, product types
- **Featured Products:** Show in "Trending Now"
- **Fallback:** Shows sample products if API unavailable

## 🆘 Need Help?

- **WooCommerce Questions:** Check WooCommerce documentation
- **Site Integration Issues:** Contact your developer
- **Product Setup:** WooCommerce admin panel has built-in help

---

**Remember:** Changes you make in WooCommerce automatically appear on your main site! No coding required.
