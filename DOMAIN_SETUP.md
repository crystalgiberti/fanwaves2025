# Domain Setup Guide for fanwaves.fun

## 🌐 Setting Up Custom Domain

### Step 1: Configure DNS Settings

You need to point your domain `fanwaves.fun` to Netlify. Add these DNS records in your domain registrar (BlueHost):

**Option A: CNAME (Recommended)**
```
Type: CNAME
Name: www
Value: fanwaves-fun.netlify.app
TTL: 3600
```

**Option B: A Records**
```
Type: A
Name: @
Value: 75.2.60.5
TTL: 3600

Type: A  
Name: www
Value: 75.2.60.5
TTL: 3600
```

### Step 2: Configure Netlify Domain

1. Go to your [Netlify Dashboard](https://app.netlify.com/projects/fanwaves-fun)
2. Click "Domain settings"
3. Click "Add custom domain"
4. Enter `fanwaves.fun`
5. Click "Verify"
6. Wait for DNS propagation (15 minutes - 48 hours)

### Step 3: SSL Certificate

Netlify will automatically provision an SSL certificate once DNS is configured. You'll see:
- ✅ `https://fanwaves.fun` (with SSL)
- ✅ `https://www.fanwaves.fun` (with SSL)

## 🔧 BlueHost DNS Configuration

### In BlueHost cPanel:

1. **Login to BlueHost cPanel**
2. **Go to "Zone Editor"**
3. **Select your domain: fanwaves.fun**
4. **Add these records:**

```
Record Type: CNAME
Host Record: www
Points to: fanwaves-fun.netlify.app.
TTL: 14400

Record Type: A
Host Record: @
Points to: 75.2.60.5
TTL: 14400
```

### Alternative: Use Netlify DNS (Recommended)

For better performance and easier management:

1. **In Netlify Dashboard:**
   - Go to "Domain settings"
   - Click "Set up Netlify DNS"
   - Copy the 4 nameservers provided

2. **In BlueHost:**
   - Go to "Domain Manager"
   - Click "Manage" next to fanwaves.fun
   - Change nameservers to Netlify's:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```

## 📧 Email Setup (if needed)

If you want to keep email with BlueHost while hosting the site on Netlify:

```
Type: MX
Name: @
Priority: 0
Value: mail.your-domain.com
TTL: 14400
```

## 🚀 Verification

Once configured, test these URLs:

- ✅ https://fanwaves.fun
- ✅ https://www.fanwaves.fun  
- ✅ http://fanwaves.fun (should redirect to HTTPS)
- ✅ http://www.fanwaves.fun (should redirect to HTTPS)

## 📱 DNS Propagation Check

Use these tools to verify DNS propagation:

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

## ⚡ Performance Optimization

After domain setup, your site will have:

- ✅ **Global CDN** - Fast loading worldwide
- ✅ **SSL Certificate** - Secure HTTPS
- ✅ **Automatic Deployments** - Updates on git push
- ✅ **Branch Previews** - Test changes safely

## 🛠️ Troubleshooting

**If domain doesn't work after 24 hours:**

1. **Check DNS records** - Verify CNAME/A records are correct
2. **Clear DNS cache** - Run `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
3. **Contact support** - Both BlueHost and Netlify have excellent support

**Common Issues:**

- **"Site not found"** = DNS not propagated yet (wait longer)
- **"Not secure"** = SSL certificate still provisioning (wait 15-30 mins)
- **Redirect loop** = Check DNS records for conflicts

## 📞 Support Contacts

- **BlueHost Support:** 1-888-401-4678
- **Netlify Support:** [support@netlify.com](mailto:support@netlify.com)
- **Domain Issues:** Check both BlueHost and Netlify documentation

---

**Expected Timeline:**
- DNS Configuration: 5 minutes
- DNS Propagation: 15 minutes - 48 hours  
- SSL Certificate: 15-30 minutes after DNS
- Full Setup Complete: Usually within 2-4 hours
