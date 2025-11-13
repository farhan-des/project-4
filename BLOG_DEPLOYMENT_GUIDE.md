# Laravel Blog Deployment Guide for Shared Hosting (Hostinger)

This guide explains how to deploy the Laravel blog system alongside your existing Calculator Tools website on shared hosting.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Local Setup](#local-setup)
4. [Database Configuration](#database-configuration)
5. [Deployment to Hostinger](#deployment-to-hostinger)
6. [Post-Deployment Setup](#post-deployment-setup)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Your website now has two parts:
- **Calculator Tools** (React) - Main website at `/`
- **Blog System** (Laravel) - Blog at `/blog`

Both work together on shared hosting!

---

## Prerequisites

Before deploying, ensure you have:

- ✅ Hostinger account with PHP 8.1+ support
- ✅ MySQL database access
- ✅ FTP/File Manager access
- ✅ SSH access (optional but recommended)
- ✅ Calculator Tools already deployed (from DEPLOYMENT.md)

---

## Local Setup

### 1. Install Dependencies

```bash
cd blog-system
composer install --optimize-autoloader --no-dev
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update:

```env
APP_NAME="Calculator Tools Blog"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

**Important:** Change `APP_KEY` - Run: `php artisan key:generate`

### 3. Create Admin User

```bash
php artisan db:seed --class=AdminUserSeeder
```

**Default Admin Credentials:**
- Email: `admin@calculatortools.com`
- Password: `admin123`

⚠️ **Important:** Change the password immediately after first login!

---

## Database Configuration

### Option 1: Using Hostinger hPanel

1. Log into Hostinger hPanel
2. Go to **MySQL Databases**
3. Create a new database (e.g., `u123456_blog`)
4. Create a database user with all privileges
5. Note down the credentials for `.env` file

### Option 2: Using phpMyAdmin

1. Access phpMyAdmin from hPanel
2. Create new database
3. Import the schema (or run migrations remotely)

---

## Deployment to Hostinger

### Method 1: File Manager (Easier)

#### Step 1: Prepare Files

Create a ZIP of these directories from `blog-system/`:
- `app/`
- `bootstrap/`
- `config/`
- `database/`
- `public/`
- `resources/`
- `routes/`
- `storage/`
- `vendor/` (after running `composer install`)
- `.env`
- `artisan`
- `composer.json`
- `composer.lock`

#### Step 2: Upload to Hostinger

1. Log into Hostinger hPanel
2. Go to **Files** → **File Manager**
3. Navigate to `public_html/`
4. Create a new folder called `blog-backend`
5. Upload the ZIP to `blog-backend/`
6. Extract the ZIP
7. Move all files from extracted folder to `blog-backend/`

#### Step 3: Configure Public Directory

The Laravel public directory needs special handling:

1. Copy contents of `blog-backend/public/` to `public_html/blog/`
2. Edit `public_html/blog/index.php`:

```php
<?php

// Update these paths to point to blog-backend
require __DIR__.'/../blog-backend/vendor/autoload.php';
$app = require_once __DIR__.'/../blog-backend/bootstrap/app.php';
```

#### Step 4: Set Permissions

In File Manager, set these permissions:
- `blog-backend/storage/` → 755 (recursive)
- `blog-backend/bootstrap/cache/` → 755 (recursive)

#### Step 5: Create .htaccess

Create `public_html/blog/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### Method 2: SSH/FTP (Advanced)

If you have SSH access:

```bash
# Upload via SCP
scp -r blog-system/* username@yourserver:/home/username/public_html/blog-backend/

# SSH into server
ssh username@yourserver

# Navigate to directory
cd ~/public_html/blog-backend

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Post-Deployment Setup

### 1. Run Database Migrations

Via SSH:
```bash
cd ~/public_html/blog-backend
php artisan migrate --force
```

Or via web browser, create `migrate.php` in `public_html/blog/`:
```php
<?php
require __DIR__.'/../blog-backend/vendor/autoload.php';
$app = require_once __DIR__.'/../blog-backend/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$status = $kernel->call('migrate', ['--force' => true]);

echo $status === 0 ? 'Migrations successful!' : 'Migrations failed!';
```

Visit: `https://yourdomain.com/blog/migrate.php` then DELETE the file!

### 2. Create Storage Link

Via SSH:
```bash
php artisan storage:link
```

Or manually create a symlink from `public_html/blog/storage` to `blog-backend/storage/app/public`

### 3. Create Admin User

Via SSH:
```bash
php artisan db:seed --class=AdminUserSeeder
```

Or via phpMyAdmin, insert into `users` table:
```sql
INSERT INTO users (name, email, password, email_verified_at, created_at, updated_at) 
VALUES (
    'Admin User',
    'admin@calculatortools.com',
    '$2y$12$LZCb3KKVQ.Oq8XL9b0aFQO5kbx6w5nUOH5z5OWxX7ZHF8H5K5H5K5',
    NOW(),
    NOW(),
    NOW()
);
```

### 4. Test Your Blog

Visit these URLs:
- **Public Blog:** `https://yourdomain.com/blog`
- **Single Post:** `https://yourdomain.com/blog/post-slug`
- **Admin Login:** `https://yourdomain.com/blog/login`
- **Admin Dashboard:** `https://yourdomain.com/blog/admin/posts`

---

## File Structure on Server

```
public_html/
├── index.html              # Calculator Tools (React)
├── .htaccess              # React routing
├── assets/                # React assets
├── favicon.png
├── blog/                  # Laravel public directory
│   ├── index.php          # Laravel entry point
│   ├── .htaccess          # Laravel routing
│   └── storage/           # Symlink to blog-backend/storage/app/public
└── blog-backend/          # Laravel application
    ├── app/
    ├── bootstrap/
    ├── config/
    ├── database/
    ├── resources/
    ├── routes/
    ├── storage/
    ├── vendor/
    ├── .env
    └── artisan
```

---

## Troubleshooting

### Issue: 404 Error on Blog Pages

**Solution:**
1. Check `.htaccess` exists in `public_html/blog/`
2. Verify mod_rewrite is enabled (contact Hostinger support)
3. Check file permissions (755 for directories, 644 for files)

### Issue: 500 Internal Server Error

**Solution:**
1. Check PHP version (must be 8.1+)
2. Enable error display in `.env`: `APP_DEBUG=true`
3. Check Laravel logs: `blog-backend/storage/logs/laravel.log`
4. Verify storage permissions: `chmod -R 755 storage bootstrap/cache`

### Issue: Images Not Displaying

**Solution:**
1. Verify storage link exists: `public_html/blog/storage` → `blog-backend/storage/app/public`
2. Check image upload permissions
3. Manually create symlink if needed

### Issue: Database Connection Failed

**Solution:**
1. Verify `.env` database credentials
2. Check database exists in hPanel → MySQL Databases
3. Verify database user has all privileges
4. Use `localhost` as DB_HOST (not 127.0.0.1)

### Issue: CSRF Token Mismatch

**Solution:**
1. Clear cache: `php artisan cache:clear`
2. Check session configuration in `.env`
3. Verify APP_URL matches your domain

### Issue: Class Not Found Errors

**Solution:**
```bash
composer dump-autoload --optimize
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

## Updating the Blog

### To Update Blog Content

1. Log into admin panel: `https://yourdomain.com/blog/login`
2. Navigate to **Admin** → **Blog Posts**
3. Create, edit, or delete posts as needed

### To Update Blog Code

1. Make changes locally
2. Run tests
3. Upload changed files via FTP/File Manager
4. Clear cache:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Security Recommendations

1. **Change Admin Password** immediately after deployment
2. **Use Strong Passwords** for database and admin accounts
3. **Keep APP_DEBUG=false** in production
4. **Regularly Update** Laravel and dependencies
5. **Backup Database** regularly
6. **Use HTTPS** (Hostinger provides free SSL)
7. **Hide .env File** - Add to .htaccess:
```apache
<Files .env>
    Order allow,deny
    Deny from all
</Files>
```

---

## Performance Optimization

1. **Enable Caching:**
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

2. **Optimize Composer:**
```bash
composer install --optimize-autoloader --no-dev
```

3. **Enable OPcache** (ask Hostinger support)

4. **Use CDN** for static assets

---

## Support

If you encounter issues:

1. **Check Laravel Logs:** `storage/logs/laravel.log`
2. **Enable Debug Mode** temporarily: `APP_DEBUG=true`
3. **Contact Hostinger Support** for server issues
4. **Laravel Documentation:** https://laravel.com/docs

---

## Summary Checklist

Before going live, ensure:

- [ ] `.env` configured with production settings
- [ ] Database created and migrations run
- [ ] Admin user created
- [ ] Storage link created
- [ ] File permissions set correctly (755 for folders, 644 for files)
- [ ] `.htaccess` in place
- [ ] Admin password changed from default
- [ ] Blog accessible at `/blog`
- [ ] Admin panel accessible at `/blog/login`
- [ ] Test post created and visible
- [ ] Navigation link working from calculator site
- [ ] SSL certificate enabled (HTTPS)

---

**Congratulations!** 🎉 Your blog system is now live and integrated with your Calculator Tools website!

Visit your blog at: `https://yourdomain.com/blog`
