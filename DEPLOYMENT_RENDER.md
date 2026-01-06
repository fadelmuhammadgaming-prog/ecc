# 🚀 Deployment Guide - Render.com

## Prerequisites
- ✅ GitHub account
- ✅ Code pushed to GitHub repository
- ✅ Render.com account (free)

## 📋 Deployment Steps

### Step 1: Sign Up to Render
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with your GitHub account
4. Authorize Render to access your GitHub

### Step 2: Create PostgreSQL Database

1. **Dashboard** → Click **"New +"** → Select **"PostgreSQL"**

2. **Configure Database:**
   ```
   Name: ecc-database
   Database: ecc_db
   User: ecc_user
   Region: Singapore (closest to Indonesia)
   PostgreSQL Version: 16
   Plan: Free
   ```

3. Click **"Create Database"**

4. **Wait 2-3 minutes** for database provisioning

5. **Copy Connection Details:**
   - Scroll down to "Connections"
   - Copy **"External Database URL"**
   - Format: `postgresql://user:password@host/database`
   - Save this URL! You'll need it for the app

### Step 3: Deploy Web Service

1. **Dashboard** → Click **"New +"** → Select **"Web Service"**

2. **Connect Repository:**
   - Click **"Connect a repository"**
   - Select: `fadelmuhammadgaming-prog/ecc`
   - Click **"Connect"**

3. **Configure Web Service:**
   ```
   Name: ecc-app
   Region: Singapore
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Add Environment Variables:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these variables:
   ```
   NODE_ENV = production
   DATABASE_URL = <paste External Database URL from Step 2>
   SESSION_SECRET = <generate random string>
   PORT = 3000
   ```
   
   **Generate SESSION_SECRET:**
   Run in terminal: 
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Or use: `render-secret-$(date +%s)-$(openssl rand -hex 16)`

5. Click **"Create Web Service"**

6. **Wait for deployment** (5-10 minutes first time)
   - Watch the logs in real-time
   - Look for: "✅ Database connected successfully"
   - Look for: "🚀 Server is running"

### Step 4: Verify Deployment

1. **Check Logs:**
   - Click **"Logs"** tab
   - Should see: 
     ```
     ✅ Environment variables validated
     ✅ Database connected successfully
     🚀 Server is running on http://0.0.0.0:3000
     ```

2. **Open Your App:**
   - Click the URL at top (e.g., `https://ecc-app.onrender.com`)
   - You should see the login page!

3. **Test Login:**
   - Default credentials from seed data
   - Test the application features

### Step 5: Run Database Migrations (if needed)

If database is empty and you need to seed data:

1. Go to **"Shell"** tab in your web service
2. Run migrations:
   ```bash
   npm run db:push
   ```

Or create tables manually via PostgreSQL client using the seed.sql file.

## 🔧 Configuration Files

### `.env.example`
Template for environment variables (already in repo)

### `render.yaml`
Auto-configuration for Render deployment (already in repo)

## 🌐 Your App URLs

After deployment, you'll get:

- **App URL:** `https://ecc-app.onrender.com`
- **Dashboard:** https://dashboard.render.com

## 📊 Free Tier Limits

### PostgreSQL Database (Free):
- ✅ 256 MB storage
- ✅ 97 hours/month uptime
- ✅ Expires after 90 days (can create new one)
- ✅ Good for testing & demo

### Web Service (Free):
- ✅ 512 MB RAM
- ✅ Shared CPU
- ✅ 750 hours/month uptime
- ✅ **Sleeps after 15 min inactivity**
- ✅ First request after sleep takes 30-50 seconds (cold start)

## 🎯 Performance Tips

### 1. Keep App Awake
Use a service like **UptimeRobot** or **Cron-Job.org** to ping your app every 10 minutes:
- URL to ping: `https://ecc-app.onrender.com`
- Interval: 10 minutes

### 2. Optimize Cold Start
Already optimized in code:
- ✅ Minimal dependencies
- ✅ Lazy loading where possible
- ✅ Efficient database queries

### 3. Monitor Performance
- Check **Metrics** tab in Render dashboard
- Monitor response times
- Watch memory usage

## 🔄 Auto Deploy from GitHub

Every time you push to `main` branch:
1. Render automatically detects changes
2. Rebuilds the app
3. Deploys new version
4. Zero downtime deployment!

## 🐛 Troubleshooting

### Issue: "Database connection failed"
**Solution:**
- Check DATABASE_URL is correct
- Ensure database is not expired (90 days)
- Check database status in Render dashboard

### Issue: "Module not found"
**Solution:**
- Check package.json has all dependencies
- Rebuild: Dashboard → Manual Deploy → Deploy latest commit

### Issue: "App won't start"
**Solution:**
- Check logs for errors
- Ensure `npm start` works locally
- Check environment variables are set

### Issue: "502 Bad Gateway"
**Solution:**
- App is probably sleeping (free tier)
- Wait 30-50 seconds and refresh
- Consider upgrading to paid tier ($7/month)

### Issue: "Port already in use"
**Solution:**
- Remove hardcoded port in server.js
- Use: `const PORT = process.env.PORT || 3000`

## 🎨 Custom Domain (Optional)

### Free:
- Use Render subdomain: `ecc-app.onrender.com`

### Paid ($7/month):
- Add custom domain: `app.yourdomain.com`
- Automatic SSL certificate
- Steps: Settings → Custom Domain → Add

## 📱 Access Database Directly

### Using PostgreSQL Client:

Get connection details from database dashboard:
```
Host: dpg-xxxxx-a.singapore-postgres.render.com
Port: 5432
Database: ecc_db
User: ecc_user
Password: <from dashboard>
```

### Tools:
- **pgAdmin** (GUI)
- **DBeaver** (GUI)
- **psql** (CLI)
- **TablePlus** (GUI)

## 🔐 Security Checklist

- ✅ SESSION_SECRET is randomly generated
- ✅ DATABASE_URL is in environment variables (not in code)
- ✅ `.env` file is in `.gitignore`
- ✅ SSL/HTTPS enabled automatically
- ✅ Database passwords are strong

## 💰 Cost Breakdown

**Free Forever:**
- 1 PostgreSQL database (renew every 90 days)
- 1 Web service (with sleep mode)
- SSL certificate
- Auto deployments
- **Total: $0/month**

**Upgrade Options:**
- Web Service (always on): **$7/month**
- PostgreSQL (persistent): **$7/month**
- Both: **$14/month**

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Node.js Guide:** https://render.com/docs/deploy-node-express-app
- **PostgreSQL Guide:** https://render.com/docs/databases

## 🎉 Success Checklist

After deployment, verify:
- [ ] App loads at Render URL
- [ ] Login page appears
- [ ] Can login with credentials
- [ ] Dashboard shows data
- [ ] All menus work (Agenda, Surat, etc.)
- [ ] Database queries work
- [ ] File uploads work
- [ ] PDF merge feature works
- [ ] No console errors

## 🚀 Next Steps

1. **Share URL** with team
2. **Test all features** thoroughly
3. **Monitor** in first 24 hours
4. **Set up UptimeRobot** to keep awake
5. **Plan upgrade** if needed for production

---

**Deployed by:** Fadel Muhammad  
**Date:** January 6, 2026  
**Platform:** Render.com  
**Status:** ✅ Production Ready

**Live URL:** `https://ecc-app.onrender.com` (after deployment)
