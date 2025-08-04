# Fan Waves - BlueHost Deployment & Removal Guide

## 📦 **Static Site Package Contents**

Your `static-site/` folder contains:

```
static-site/
├── index.html              # Main homepage
├── collections.html        # Products/collections page
├── .htaccess               # BlueHost server configuration
├── robots.txt              # SEO configuration
├── assets/
│   ├── css/
│   │   └── main.css        # All styles
│   └── js/
│       ├── main.js         # Core functionality
│       └── collections.js  # Collections page logic
└── [additional pages needed]
```

## 🚀 **BlueHost Deployment Instructions**

### **Method 1: File Manager (Recommended)**

1. **Login to BlueHost cPanel**
   - Go to your BlueHost account
   - Click "cPanel" or "Advanced"

2. **Access File Manager**
   - Find "Files" section
   - Click "File Manager"

3. **Navigate to public_html**
   - Click on `public_html` folder
   - This is your website root directory

4. **Upload Static Site Files**
   - Click "Upload" button
   - Upload the zip file containing your static site
   - Extract the zip file
   - Move all contents from `static-site/` folder to `public_html/`

5. **Set Permissions**
   - Right-click `.htaccess`
   - Set permissions to `644`
   - Right-click `index.html`
   - Set permissions to `644`

### **Method 2: FTP Upload**

1. **Get FTP Credentials**
   - From BlueHost cPanel → "FTP Accounts"
   - Create FTP account or use main account

2. **Use FTP Client**
   - FileZilla (free): https://filezilla-project.org/
   - Connect to your FTP server
   - Upload all `static-site/` contents to `/public_html/`

### **Method 3: Git Deployment (Advanced)**

1. **Enable Git in cPanel**
   - Look for "Git Version Control"
   - Create repository in `public_html`

2. **Push Static Files**
   - Add static files to Git repository
   - Push to BlueHost Git repository

## 🗑️ **Complete Site Removal Guide**

### **⚠️ BACKUP FIRST!**

**Before removing anything, create backups:**

1. **Database Backup**
   - cPanel → "phpMyAdmin"
   - Select your WordPress database
   - Click "Export" → "Go"
   - Save the SQL file

2. **File Backup**
   - cPanel → "Backup Wizard"
   - Download "Home Directory Backup"
   - Or use File Manager to download `public_html` as zip

### **Step 1: Remove WordPress/WooCommerce Files**

**Via File Manager:**
1. Login to cPanel → File Manager
2. Navigate to `public_html`
3. **Select ALL files and folders** (be careful!)
4. Click "Delete" 
5. Confirm deletion

**Important files to remove:**
- `wp-admin/`
- `wp-content/`
- `wp-includes/`
- `wp-config.php`
- `index.php`
- `.htaccess` (old one)
- All WordPress files

### **Step 2: Remove Database**

1. **cPanel → MySQL Databases**
2. Find your WordPress database (usually starts with your username)
3. Click "Delete Database"
4. Confirm deletion

**Alternative:**
1. **cPanel → phpMyAdmin**
2. Select WordPress database
3. Click "Drop" database
4. Type "DROP" to confirm

### **Step 3: Remove Database User**

1. **cPanel → MySQL Databases**
2. Find database user for WordPress
3. Click "Delete User"
4. Confirm deletion

### **Step 4: Clean Up Email/Subdomains**

1. **Remove WordPress-related emails** (if any)
   - cPanel → "Email Accounts"
   - Delete unused accounts

2. **Remove subdomains** (if any)
   - cPanel → "Subdomains"
   - Delete unused subdomains

### **Step 5: Clean Up Add-on Domains**

1. **cPanel → "Addon Domains"**
2. Remove any domains pointing to WordPress installation
3. Keep your main domain for the static site

## 🔧 **Post-Deployment Configuration**

### **1. Verify Static Site Works**
- Visit your domain: `https://fanwaves.fun`
- Check all pages load properly
- Test navigation and links
- Verify Riff chatbot works

### **2. Set Up SSL Certificate**
- cPanel → "SSL/TLS"
- Enable "Force HTTPS Redirect"
- Install free Let's Encrypt certificate

### **3. Configure DNS (if needed)**
- Point domain to BlueHost nameservers
- Verify A record points to BlueHost IP

### **4. SEO Setup**
- Submit `robots.txt` to search engines
- Create and submit sitemap
- Set up Google Analytics (optional)

## 📊 **Monitoring & Maintenance**

### **Performance**
- Use GTmetrix or PageSpeed Insights
- Monitor loading times
- Optimize images if needed

### **Security**
- Keep `.htaccess` security headers
- Monitor for unusual activity
- Regular backups (monthly)

### **Updates**
- Update static files as needed
- Monitor WooCommerce store separately
- Keep domain/hosting renewed

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Site not loading**
   - Check file permissions (644 for files, 755 for folders)
   - Verify index.html is in public_html root
   - Check .htaccess syntax

2. **CSS/JS not loading**
   - Check file paths in HTML
   - Verify assets folder uploaded correctly
   - Check browser console for errors

3. **404 Errors**
   - Verify all HTML files uploaded
   - Check .htaccess configuration
   - Test links in navigation

4. **SSL Issues**
   - Enable SSL in cPanel
   - Update .htaccess HTTPS redirect
   - Clear browser cache

## 📞 **Support Contacts**

### **BlueHost Support**
- Phone: 1-855-746-6174
- Live Chat: Available 24/7
- Ticket System: Through cPanel

### **What to Tell Support**
- "Converting from WordPress to static HTML site"
- "Need help with file upload/permissions"
- "Configuring .htaccess for static site"

## ✅ **Final Checklist**

### **Before Deployment:**
- [ ] Downloaded/backed up all important data
- [ ] Created static site zip file
- [ ] Tested static site locally

### **During Deployment:**
- [ ] Removed all WordPress files
- [ ] Deleted WordPress database
- [ ] Uploaded static site files
- [ ] Set correct file permissions
- [ ] Configured .htaccess

### **After Deployment:**
- [ ] Verified site loads correctly
- [ ] Tested all navigation links
- [ ] Enabled SSL/HTTPS
- [ ] Set up monitoring
- [ ] Updated DNS if needed

## 🎯 **Expected Results**

After successful deployment:
- ✅ **Fast loading** static HTML site
- ✅ **Riff chatbot** working properly
- ✅ **All links** directing to WooCommerce store
- ✅ **Mobile responsive** design
- ✅ **SEO optimized** with proper meta tags
- ✅ **Secure** with HTTPS and security headers

Your static site will be lightning-fast, secure, and professional while still connecting customers to your WooCommerce store for purchases!
