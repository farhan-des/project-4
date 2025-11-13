# 🚀 Deployment Guide for Hostinger

This guide will help you deploy the Calculator Tools website to your Hostinger web hosting server.

## 📋 Prerequisites

- Hostinger hosting account (shared hosting or business hosting)
- Domain name connected to your Hostinger account
- Access to Hostinger hPanel (control panel)
- Basic familiarity with file management

---

## 🎯 Quick Start (3 Simple Steps)

1. **Download** the project ZIP from Replit
2. **Build** the production files
3. **Upload** to Hostinger

---

## 📦 Step 1: Download the Project

### Option A: Download from Replit (Easiest)

1. In your Replit project, look at the **file browser** on the left side
2. Click the **three-dot menu (⋮)** at the top
3. Select **"Download as zip"**
4. Save the ZIP file to your computer

### Option B: Clone from GitHub (If using Git)

```bash
git clone https://github.com/yourusername/calculator-tools.git
cd calculator-tools
```

---

## 🛠️ Step 2: Build Production Files

### 2.1 Install Dependencies

Open your terminal/command prompt in the project folder:

```bash
npm install
```

### 2.2 Build for Production

Run the build command:

```bash
npm run build
```

This creates a `dist/public` folder with optimized files ready for hosting.

**What happens during build:**
- ✅ JavaScript is minified and optimized
- ✅ CSS is processed and compressed
- ✅ Images are optimized
- ✅ All files are production-ready

---

## 🌐 Step 3: Upload to Hostinger

### 3.1 Access Hostinger File Manager

1. Log into your **Hostinger hPanel** at https://hpanel.hostinger.com
2. Navigate to **Files** → **File Manager**
3. You'll see your hosting file structure

### 3.2 Prepare the public_html Folder

1. Navigate to the `public_html` folder (this is your website's root)
2. **Delete** any default files (like `index.html`, `default.html`)
   - Select the files → Click **Delete**
   - This ensures a clean deployment

### 3.3 Upload Your Built Files

**Method 1: Upload ZIP (Recommended)**

1. Click the **Upload** button in File Manager
2. Upload the **entire contents** of your `dist/public` folder as a ZIP:
   - First, compress everything **inside** `dist/public` (not the folder itself)
   - Upload this ZIP file
3. Right-click the ZIP file → Select **Extract**
4. Move all extracted files to the root of `public_html`
5. Delete the empty ZIP file

**Method 2: Upload Individual Files**

1. Open your local `dist/public` folder
2. Select all files and folders inside it
3. Drag and drop them into the Hostinger File Manager's `public_html` folder
4. Wait for upload to complete

### 3.4 Verify File Structure

Your `public_html` folder should now look like this:

```
public_html/
├── index.html          (main file)
├── .htaccess          (routing configuration)
├── assets/            (CSS, JS, images folder)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [other files]
```

---

## ⚙️ Step 4: Configure .htaccess (Important!)

The `.htaccess` file is **already included** in the build, but verify it exists:

### 4.1 Check .htaccess File

1. In File Manager, look for `.htaccess` in `public_html`
2. If you don't see it, click **Settings** (top right) → Enable **Show Hidden Files**

### 4.2 Verify .htaccess Contents

The file should contain:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

**Why is this important?**
- Ensures React Router works correctly
- Redirects all routes to `index.html`
- Prevents 404 errors when navigating directly to calculator pages

---

## ✅ Step 5: Test Your Live Website

1. Open your browser
2. Visit your domain: `https://yourdomain.com`
3. Test the following:
   - ✅ Homepage loads correctly
   - ✅ Both calculator categories are visible
   - ✅ Click on "Playback Speed Calculator" → Should navigate to `/playback-speed-calculator`
   - ✅ Click on "LCM Calculator" → Should navigate to `/lcm-calculator`
   - ✅ Perform a calculation on each calculator
   - ✅ Click "Calculator Tools" in header → Returns to homepage
   - ✅ Refresh the page on a calculator route → Should still work (not 404)

---

## 🔧 Troubleshooting

### Problem: Blank White Page

**Solution:**
- Check browser console (F12) for errors
- Verify all files uploaded correctly
- Clear browser cache (Ctrl+Shift+Delete)
- Check file permissions (should be 644 for files, 755 for folders)

### Problem: 404 Error on Calculator Pages

**Solution:**
- Verify `.htaccess` file exists in `public_html`
- Check `.htaccess` file contents match the example above
- Ensure `.htaccess` file permissions are 644
- Contact Hostinger support to verify mod_rewrite is enabled

### Problem: "Not Found" When Refreshing Calculator Pages

**Solution:**
- This means `.htaccess` isn't working
- Double-check the file exists and has correct content
- Try renaming it to ensure no hidden characters

### Problem: CSS/JS Not Loading

**Solution:**
- Verify the `assets` folder uploaded correctly
- Check browser console for 404 errors on asset files
- Ensure file paths in `index.html` are correct
- Clear browser cache

### Problem: 403 Forbidden Error

**Solution:**
- Check file permissions:
  - Files: 644
  - Folders: 755
- In File Manager → Right-click file → Permissions
- Change accordingly

---

## 🔄 Updating Your Website

When you make changes and want to update the live site:

1. **Make changes** in your local project
2. **Rebuild**: Run `npm run build`
3. **Delete old files** from `public_html` (except `.htaccess` if you customized it)
4. **Upload new files** from `dist/public`
5. **Clear cache** and test

---

## 📱 Mobile Testing

Always test on mobile devices:

1. Visit your site on a smartphone
2. Test all calculators
3. Verify responsive design works
4. Check footer language selector

---

## 🌍 Using a Custom Domain

If you want to use a custom domain:

1. Point your domain to Hostinger nameservers
2. In hPanel, go to **Domains** → **Add Domain**
3. Follow Hostinger's domain setup wizard
4. Upload files to your domain's folder (usually `public_html/yourdomain.com`)

---

## 💡 Performance Tips

### Enable HTTPS (Free SSL)

1. In hPanel, go to **Advanced** → **SSL**
2. Select your domain
3. Click **Install SSL**
4. Wait a few minutes for activation

### Enable Caching

Add to your `.htaccess`:

```apache
# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Enable Gzip Compression

Add to your `.htaccess`:

```apache
# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
```

---

## 📞 Need Help?

- **Hostinger Support**: Contact via hPanel live chat (24/7)
- **Project Issues**: Check the GitHub repository or Replit community

---

## 🎉 Success!

Your Calculator Tools website is now live on Hostinger! 

Share your website URL with others and start adding more calculators using the tools registry system.

**Next Steps:**
- Add more calculator tools
- Customize the design
- Add Google Analytics
- Set up email forwarding for your domain

---

**Deployment Checklist:**
- [ ] Downloaded project ZIP
- [ ] Ran `npm install`
- [ ] Ran `npm run build`
- [ ] Uploaded `dist/public` contents to `public_html`
- [ ] Verified `.htaccess` exists
- [ ] Tested homepage loads
- [ ] Tested both calculators work
- [ ] Tested navigation and routing
- [ ] Enabled SSL certificate
- [ ] Tested on mobile devices

Happy hosting! 🚀
