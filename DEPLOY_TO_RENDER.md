# 🚀 Deploy WhatsApp Server to Render

## Repository Setup Complete ✅

This repository is now ready to deploy to Render!

---

## 📋 Pre-Deployment Checklist

- [x] Git repository initialized
- [x] Code pushed to GitHub: `https://github.com/Rehansamlewale/Web-Service.git`
- [ ] Render account created
- [ ] Firebase credentials ready

---

## 🎯 Deploy to Render

### Step 1: Create Web Service

1. Go to: https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect account"** (if not connected) or **"Configure account"**
4. Select **"Rehansamlewale/Web-Service"** repository
5. Click **"Connect"**

### Step 2: Configure Service

| Setting | Value |
|---------|-------|
| **Name** | `whatsapp-reminder-server` |
| **Root Directory** | Leave empty (entire repo is the server) |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Open your `serviceAccountKey.json.json` file and copy these values:

```
FIREBASE_TYPE = service_account
FIREBASE_PROJECT_ID = <from serviceAccountKey.json>
FIREBASE_PRIVATE_KEY_ID = <from serviceAccountKey.json>
FIREBASE_PRIVATE_KEY = <from serviceAccountKey.json - KEEP the \n characters>
FIREBASE_CLIENT_EMAIL = <from serviceAccountKey.json>
FIREBASE_CLIENT_ID = <from serviceAccountKey.json>
FIREBASE_AUTH_URI = https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI = https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL = https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL = <from serviceAccountKey.json>
FIREBASE_DATABASE_URL = https://rehanpro-6f322-default-rtdb.firebaseio.com
```

### Step 4: Add Persistent Disk (Critical!)

**Why?** Saves WhatsApp session so you don't scan QR every restart.

1. Scroll to **"Disks"** section
2. Click **"Add Disk"**
3. Configure:
   - **Name**: `whatsapp-session`
   - **Mount Path**: `/opt/render/project/src/.wwebjs_auth`
   - **Size**: `1 GB` (Free)

### Step 5: Deploy!

1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Check logs for QR code

---

## 📱 Login to WhatsApp

### Get QR Code from Firebase

1. Go to: https://console.firebase.google.com/project/rehanpro-6f322/database/rehanpro-6f322-default-rtdb/data
2. Navigate to `whatsapp_qr` node
3. Copy the QR string
4. Go to: https://www.qr-code-generator.com/
5. Paste and generate QR image
6. Scan with WhatsApp:
   - Open WhatsApp → Settings → Linked Devices → Link a Device

### Verify in Logs

Check Render logs for:
```
✅ WhatsApp authenticated successfully!
✅ WhatsApp client is ready!
🚀 Reminder server is now running...
```

---

## 🔧 Environment Variables Guide

### How to Extract from serviceAccountKey.json

Your `serviceAccountKey.json.json` looks like this:

```json
{
  "type": "service_account",
  "project_id": "rehanpro-6f322",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nXXXXX...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@rehanpro-6f322.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Map to Environment Variables:**

- `FIREBASE_PROJECT_ID` = `project_id` value
- `FIREBASE_PRIVATE_KEY_ID` = `private_key_id` value
- `FIREBASE_PRIVATE_KEY` = `private_key` value (KEEP the `\n` characters!)
- `FIREBASE_CLIENT_EMAIL` = `client_email` value
- `FIREBASE_CLIENT_ID` = `client_id` value
- `FIREBASE_CLIENT_CERT_URL` = `client_x509_cert_url` value

---

## ⚠️ Important Notes

### Free Tier Limitations
- Server spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up
- 750 hours/month free (enough for 24/7)

### Persistent Disk
- **With disk**: WhatsApp session saved, no QR scan needed
- **Without disk**: Must scan QR every restart

### Keep Server Alive
To prevent spin-down:
- Upgrade to paid ($7/month)
- Use cron job to ping every 10 min
- Accept 30-second wake delay

---

## 🐛 Troubleshooting

### Build Failed
- Check Node.js version compatibility
- Verify `package.json` exists
- Check build logs for errors

### WhatsApp Disconnected
- Verify persistent disk is mounted
- Check WhatsApp is active on phone
- May need to scan QR again

### Environment Variables Error
- Double-check all Firebase credentials
- Ensure `FIREBASE_PRIVATE_KEY` includes `\n` characters
- Verify no extra spaces in values

### QR Code Not in Firebase
- Check database rules allow writes
- Verify Firebase credentials are correct
- Check server logs for errors

---

## ✅ Post-Deployment Checklist

- [ ] Service deployed successfully (green status)
- [ ] Logs show "Initializing WhatsApp client..."
- [ ] QR code saved to Firebase
- [ ] WhatsApp scanned and authenticated
- [ ] Logs show "WhatsApp client is ready!"
- [ ] Persistent disk mounted
- [ ] Test reminder sent successfully

---

## 🎉 Success!

Your WhatsApp reminder server is now live on Render!

**What happens now:**
- ✅ Checks Firebase every minute for pending reminders
- ✅ Sends WhatsApp messages automatically
- ✅ Updates status in Firebase
- ✅ Runs 24/7 (with free tier limitations)

**Cost: $0/month** 🎊

---

## 📞 Need Help?

- Check Render logs for errors
- Verify Firebase credentials
- Ensure WhatsApp is active on phone
- Check database rules allow read/write

---

**Made with ❤️ by Rehan Samlewale**
