# Fan Waves Complete Automation Setup

## 🎯 **Current Status**
✅ **WooCommerce Integration**: Products sync automatically from your store  
✅ **Frontend Setup**: Main site displays WooCommerce products in real-time  
🔄 **Deployment**: Manual (needs automation)  
🔄 **Webhooks**: Not configured (optional enhancement)  

## 🚀 **Phase 1: Immediate Product Sync (WORKING NOW)**

### **What's Already Automated:**
- ✅ Add products in WooCommerce → Appear on main site
- ✅ Mark products as "Featured" → Show in "Trending Now"
- ✅ Set categories → Products appear in correct collections
- ✅ Price changes → Update automatically on main site
- ✅ Stock status → Reflects real-time availability

### **How to Use Right Now:**
1. **Add Products**: Go to `fanwaves.fun/shop/wp-admin/` → Products → Add New
2. **Set Featured**: Check "Featured Product" for homepage display
3. **Add Categories**: Assign to Hats, Jerseys, Accessories, etc.
4. **Upload Images**: First image shows on main site
5. **Set Prices**: Regular and sale prices sync automatically

## 🔄 **Phase 2: Deployment Automation**

### **Option A: GitHub Actions (Recommended)**

Create automated deployment pipeline:

```yaml
# .github/workflows/deploy.yml
name: Deploy to BlueHost
on:
  push:
    branches: [main]
    
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to BlueHost
        uses: SamKirkland/FTP-Deploy-Action@4.3.3
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./production-files/
          server-dir: /public_html/
```

### **Option B: BlueHost Git Integration**

Set up direct Git deployment:
- Enable Git in BlueHost cPanel
- Connect to your repository
- Auto-deploy on push to main branch

### **Option C: Manual Script (Interim Solution)**

```bash
#!/bin/bash
# deploy.sh - Run this to deploy latest changes
npm run build
cp -r dist/spa/* production-files/
echo "Files ready for upload to BlueHost"
echo "Upload production-files/* to your BlueHost public_html folder"
```

## 📡 **Phase 3: Advanced Webhook Integration (Optional)**

### **Real-time WooCommerce Webhooks**

Set up instant notifications when products change:

```javascript
// server/routes/webhooks.js
app.post('/api/webhooks/woocommerce', (req, res) => {
  const event = req.headers['x-wc-webhook-topic'];
  
  switch(event) {
    case 'product.created':
      // Notify frontend of new product
      break;
    case 'product.updated':
      // Refresh product data
      break;
    case 'product.deleted':
      // Remove from cache
      break;
  }
  
  res.status(200).send('OK');
});
```

Configure in WooCommerce:
- Go to WooCommerce → Settings → Advanced → Webhooks
- Add webhook URL: `https://yoursite.com/api/webhooks/woocommerce`
- Select events: Product created, updated, deleted

## 🔧 **Phase 4: Build Optimization**

### **Automated Build Process**

```json
{
  "scripts": {
    "build:production": "npm run build && npm run optimize",
    "optimize": "node scripts/optimize-production.js",
    "deploy:check": "node scripts/pre-deploy-check.js",
    "deploy:auto": "npm run build:production && npm run deploy:check && npm run deploy:upload"
  }
}
```

### **Environment Management**

```bash
# .env.production
WOOCOMMERCE_URL=https://fanwaves.fun/shop/
WOOCOMMERCE_CONSUMER_KEY=your_live_key
WOOCOMMERCE_CONSUMER_SECRET=your_live_secret
NODE_ENV=production
```

## 📋 **Implementation Timeline**

### **Week 1: Product Setup (DO THIS NOW)**
- [ ] Add 10-20 products to WooCommerce
- [ ] Set featured products
- [ ] Configure categories (NFL, NCAA, Hats, etc.)
- [ ] Test product sync on main site

### **Week 2: Basic Automation**
- [ ] Set up GitHub repository
- [ ] Configure deployment script
- [ ] Test automated builds

### **Week 3: Advanced Features**
- [ ] Implement webhooks
- [ ] Set up monitoring
- [ ] Configure error alerts

### **Week 4: Optimization**
- [ ] Performance tuning
- [ ] SEO optimization
- [ ] Analytics integration

## 🛠 **Required Setup Steps**

### **1. GitHub Repository**
```bash
git init
git add .
git commit -m "Initial Fan Waves setup"
git remote add origin https://github.com/yourusername/fanwaves.git
git push -u origin main
```

### **2. BlueHost FTP Credentials**
Collect from BlueHost cPanel:
- FTP Host
- FTP Username  
- FTP Password
- Directory path (/public_html/)

### **3. Environment Variables**
Add to your deployment system:
- `WOOCOMMERCE_URL`
- `WOOCOMMERCE_CONSUMER_KEY`
- `WOOCOMMERCE_CONSUMER_SECRET`

## 🚨 **Important Notes**

### **Security**
- Never commit API keys to repository
- Use environment variables for sensitive data
- Enable HTTPS on BlueHost

### **Performance**
- Products cache for 5 minutes
- Images optimize automatically
- Lazy loading implemented

### **Monitoring**
- Set up uptime monitoring
- Configure error alerts
- Track product sync status

## 🎯 **Next Actions (Priority Order)**

1. **IMMEDIATE**: Add products to WooCommerce (they'll show automatically)
2. **THIS WEEK**: Set up GitHub repository
3. **NEXT WEEK**: Configure automated deployment
4. **LATER**: Add webhooks and advanced features

## 📞 **Support Resources**

- **WooCommerce**: Product management
- **BlueHost**: Hosting and deployment
- **GitHub**: Code repository and automation
- **Fan Waves Dev**: Technical integration issues

---

**Remember**: Products you add to WooCommerce are already showing on your main site! The automation we're building just makes deployment easier.
