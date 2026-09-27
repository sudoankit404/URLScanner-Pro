# Deployment Guide - URLScanner-Pro

Complete guide to deploying URLScanner-Pro on various platforms.

## 📋 Table of Contents

- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Cloudflare Pages](#cloudflare-pages)
- [Traditional Hosting](#traditional-hosting)
- [Custom Domain Setup](#custom-domain-setup)

---

## 🌐 GitHub Pages

**Free, easy, and recommended for beginners!**

### Method 1: Via GitHub Settings (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/urlscanner-pro.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Under "Source", select `main` branch
   - Choose `/ (root)` folder
   - Click `Save`

3. **Access your site**
   ```
   https://yourusername.github.io/urlscanner-pro
   ```
   
   *Note: It may take a few minutes to deploy*

### Method 2: Via GitHub Actions

1. **Create workflow file**
   ```bash
   mkdir -p .github/workflows
   ```

2. **Add `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: .
   ```

3. **Push and auto-deploy**
   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

**Pros:**
- ✅ Free hosting
- ✅ Easy setup
- ✅ Automatic deployments
- ✅ Custom domain support
- ✅ HTTPS included

**Cons:**
- ⚠️ Public repositories only (for free)
- ⚠️ Limited to static sites

---

## 🚀 Netlify

**Great for continuous deployment!**

### Method 1: Drag & Drop

1. **Visit [Netlify](https://www.netlify.com)**
2. **Sign up/Login**
3. **Drag and drop your folder** (containing index.html, etc.)
4. **Done!** Your site is live

### Method 2: Git Integration

1. **Connect to Git**
   - Click "New site from Git"
   - Choose GitHub/GitLab/Bitbucket
   - Select your repository

2. **Configure build settings**
   ```
   Build command: (leave empty)
   Publish directory: .
   ```

3. **Deploy**
   - Click "Deploy site"
   - Automatic deployments on push

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Follow prompts
# Choose existing site or create new
# Set publish directory to "."

# Production deploy
netlify deploy --prod
```

### Custom Domain on Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain
4. Follow DNS configuration steps

**Pros:**
- ✅ Instant deploy
- ✅ Free SSL
- ✅ Continuous deployment
- ✅ Forms support
- ✅ Excellent performance

**Cons:**
- ⚠️ Free tier has limits
- ⚠️ May require account

---

## ⚡ Vercel

**Fast and optimized for modern web!**

### Method 1: Import from Git

1. **Visit [Vercel](https://vercel.com)**
2. **Click "New Project"**
3. **Import your Git repository**
4. **Configure:**
   ```
   Framework Preset: Other
   Build Command: (leave empty)
   Output Directory: .
   Install Command: (leave empty)
   ```
5. **Deploy**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts
# Production deploy
vercel --prod
```

### Method 3: Deploy Button

Add to your README:
```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/urlscanner-pro)
```

**Pros:**
- ✅ Lightning fast
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Great performance
- ✅ Easy rollbacks

**Cons:**
- ⚠️ Free tier limits
- ⚠️ May be overkill for simple sites

---

## ☁️ Cloudflare Pages

**Free, fast, and unlimited bandwidth!**

### Setup

1. **Visit [Cloudflare Pages](https://pages.cloudflare.com)**
2. **Connect Git repository**
3. **Configure build:**
   ```
   Build command: (none)
   Build output directory: .
   ```
4. **Deploy**

### Benefits

- Unlimited bandwidth
- Unlimited requests
- 500 builds per month
- Free SSL
- Global CDN

**Pros:**
- ✅ Truly unlimited bandwidth
- ✅ Excellent performance
- ✅ Built-in analytics
- ✅ DDoS protection
- ✅ Free forever

**Cons:**
- ⚠️ Requires Cloudflare account
- ⚠️ Learning curve

---

## 🗂️ Traditional Hosting

### Shared Hosting (cPanel, etc.)

1. **Connect via FTP/SFTP**
   ```
   Host: ftp.yourdomain.com
   Username: your_username
   Password: your_password
   ```

2. **Upload files**
   - Upload index.html
   - Upload styles.css
   - Upload scanner.js
   - To public_html or www folder

3. **Access site**
   ```
   https://yourdomain.com
   ```

### VPS (Ubuntu/Nginx)

1. **Install Nginx**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Upload files**
   ```bash
   # Upload to:
   /var/www/html/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
   }
   ```

4. **Enable site**
   ```bash
   sudo systemctl restart nginx
   ```

### Apache Server

1. **Upload files to:**
   ```
   /var/www/html/
   ```

2. **Create .htaccess** (optional)
   ```apache
   # Enable compression
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css application/javascript
   </IfModule>
   
   # Enable caching
   <IfModule mod_expires.c>
     ExpiresActive On
     ExpiresByType text/css "access plus 1 month"
     ExpiresByType application/javascript "access plus 1 month"
   </IfModule>
   ```

---

## 🌍 Custom Domain Setup

### For GitHub Pages

1. **Add CNAME file**
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

### For Netlify/Vercel

1. **Add domain in dashboard**
2. **Update DNS records** (they provide specific values)
3. **Wait for DNS propagation** (up to 24 hours)

### SSL Certificate

Most platforms provide automatic SSL:
- ✅ GitHub Pages (automatic)
- ✅ Netlify (automatic)
- ✅ Vercel (automatic)
- ✅ Cloudflare Pages (automatic)

For custom servers:
```bash
# Using Let's Encrypt (free)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔧 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All features work
- [ ] Dark/Light theme toggles
- [ ] URL scanning functions
- [ ] Screenshots load
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain works (if applicable)
- [ ] No console errors
- [ ] Performance is good

---

## 📊 Performance Optimization

### Enable Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Enable Caching

**Nginx:**
```nginx
location ~* \.(css|js)$ {
    expires 1M;
    add_header Cache-Control "public";
}
```

**Apache:**
```apache
<FilesMatch "\.(css|js)$">
  Header set Cache-Control "max-age=2592000, public"
</FilesMatch>
```

### CDN Setup

Use a CDN for even better performance:
- Cloudflare (free)
- AWS CloudFront
- Google Cloud CDN

---

## 🚨 Troubleshooting

### Site not loading

- Check DNS propagation (use dnschecker.org)
- Verify files are in correct directory
- Check for typos in file names
- Clear browser cache

### Features not working

- Check browser console for errors
- Verify all files are uploaded
- Check file permissions (755 for directories, 644 for files)
- Test in different browser

### SSL issues

- Wait for SSL provisioning (can take up to 24 hours)
- Check DNS records
- Force HTTPS in platform settings

---

## 💡 Tips

1. **Use Git** for version control
2. **Test locally** before deploying
3. **Enable HTTPS** always
4. **Monitor analytics** to track usage
5. **Keep backups** of your files
6. **Update regularly** with new features

---

## 🆘 Need Help?

- 📖 Check platform documentation
- 💬 Open an issue on GitHub
- 🔍 Search for similar problems
- 📧 Contact support

---

**Happy Deploying! 🚀**
