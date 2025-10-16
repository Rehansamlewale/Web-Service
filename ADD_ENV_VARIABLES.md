# 🔐 Add Environment Variables to Render

## ⚠️ CRITICAL STEP - Your server won't work without this!

---

## 📋 Steps to Add Environment Variables

### 1. Go to Render Dashboard
https://dashboard.render.com/web/srv-d3n3c0ili9vc738o8sag

### 2. Click "Environment" Tab
On the left sidebar, click **"Environment"**

### 3. Add Each Variable

Click **"Add Environment Variable"** and add these **one by one**:

---

## 🔑 Variables to Add

Open your **`serviceAccountKey.json.json`** file in the `whatsapp-server` folder and copy the values:

### Variable 1:
- **Key**: `FIREBASE_TYPE`
- **Value**: `service_account`

### Variable 2:
- **Key**: `FIREBASE_PROJECT_ID`
- **Value**: Copy the `project_id` from your serviceAccountKey.json.json

### Variable 3:
- **Key**: `FIREBASE_PRIVATE_KEY_ID`
- **Value**: Copy the `private_key_id` from your serviceAccountKey.json.json

### Variable 4: (IMPORTANT - Keep the \n characters!)
- **Key**: `FIREBASE_PRIVATE_KEY`
- **Value**: Copy the ENTIRE `private_key` from your serviceAccountKey.json.json
  - It starts with: `-----BEGIN PRIVATE KEY-----\n`
  - It ends with: `\n-----END PRIVATE KEY-----\n`
  - **KEEP all the `\n` characters exactly as they are!**

### Variable 5:
- **Key**: `FIREBASE_CLIENT_EMAIL`
- **Value**: Copy the `client_email` from your serviceAccountKey.json.json

### Variable 6:
- **Key**: `FIREBASE_CLIENT_ID`
- **Value**: Copy the `client_id` from your serviceAccountKey.json.json

### Variable 7:
- **Key**: `FIREBASE_AUTH_URI`
- **Value**: `https://accounts.google.com/o/oauth2/auth`

### Variable 8:
- **Key**: `FIREBASE_TOKEN_URI`
- **Value**: `https://oauth2.googleapis.com/token`

### Variable 9:
- **Key**: `FIREBASE_AUTH_PROVIDER_CERT_URL`
- **Value**: `https://www.googleapis.com/oauth2/v1/certs`

### Variable 10:
- **Key**: `FIREBASE_CLIENT_CERT_URL`
- **Value**: Copy the `client_x509_cert_url` from your serviceAccountKey.json.json

### Variable 11:
- **Key**: `FIREBASE_DATABASE_URL`
- **Value**: `https://rehanpro-6f322-default-rtdb.firebaseio.com`

---

## 4. Save Changes

After adding all 11 variables:
1. Click **"Save Changes"** button
2. Render will **automatically redeploy** your service
3. Wait 2-3 minutes

---

## 5. Check Deployment Logs

1. Click **"Logs"** tab
2. Look for these messages:
   ```
   🔧 Using Firebase credentials from environment variables
   🔄 Initializing WhatsApp client...
   📱 Scan this QR code with your WhatsApp app:
   ```

---

## 6. Login to WhatsApp

### Option A: Get QR from Firebase (Easiest)
1. Go to: https://console.firebase.google.com/project/rehanpro-6f322/database/rehanpro-6f322-default-rtdb/data
2. Find the `whatsapp_qr` node
3. Copy the QR string
4. Go to: https://www.qr-code-generator.com/
5. Paste and generate the QR image
6. Scan with WhatsApp:
   - Open WhatsApp → Settings → Linked Devices → Link a Device

### Option B: View in Logs
- The QR code is also printed in the Render logs (harder to scan)

---

## ✅ Verify Success

Check logs for:
```
✅ WhatsApp authenticated successfully!
✅ WhatsApp client is ready!
🚀 Reminder server is now running...
⏰ Starting reminder checker (runs every minute)...
```

---

## 🎉 Done!

Your WhatsApp reminder server is now:
- ✅ Deployed on Render
- ✅ Connected to Firebase
- ✅ Authenticated with WhatsApp
- ✅ Running 24/7 (with free tier limitations)
- ✅ Checking for reminders every minute

**Cost: $0/month** 🎊

---

## 🐛 Troubleshooting

### Build Fails
- Double-check all environment variables
- Ensure no typos in variable names
- Check logs for specific error

### "Firebase credentials invalid"
- Verify you copied the correct values
- Check `FIREBASE_PRIVATE_KEY` has all `\n` characters
- Make sure no extra spaces in values

### "WhatsApp disconnected"
- Normal on first deploy
- Scan QR code to authenticate
- Should stay connected after that

---

**Need the values?** Open `serviceAccountKey.json.json` in your `whatsapp-server` folder!
