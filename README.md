# 📱 WhatsApp Reminder Server - 100% FREE!

## 🎉 No Twilio, No Cost, Just Your WhatsApp!

This server uses **whatsapp-web.js** to send reminders through your own WhatsApp account - completely FREE!

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get Firebase Service Account Key

1. Go to: https://console.firebase.google.com/project/rehanpro-6f322/settings/serviceaccounts/adminsdk

2. Click **"Generate new private key"**

3. Download the JSON file

4. **Rename it to** `serviceAccountKey.json`

5. **Move it to** the `whatsapp-server` folder (this folder)

### Step 2: Install Dependencies

```powershell
cd whatsapp-server
npm install
```

### Step 3: Start the Server

```powershell
npm start
```

### Step 4: Scan QR Code

1. A QR code will appear in your terminal
2. Open **WhatsApp** on your phone
3. Go to **Settings** → **Linked Devices** → **Link a Device**
4. Scan the QR code
5. Wait for "✅ WhatsApp client is ready!"

### Step 5: Done! 🎉

The server is now running and will:
- ✅ Check for reminders every minute
- ✅ Send WhatsApp messages automatically
- ✅ Update status in Firebase
- ✅ Work 24/7 as long as server is running

---

## 🚀 How It Works

```
1. User creates reminder in your web app
   ↓
2. Saved to Firebase: reminderMessages/
   ↓
3. This server checks every minute
   ↓
4. Finds due reminders (time <= now)
   ↓
5. Sends WhatsApp message via your account
   ↓
6. Updates status to 'sent'
   ↓
7. User receives message on WhatsApp! 📱
```

---

## 📋 Features

- ✅ **100% FREE** - No Twilio, no costs
- ✅ **Uses your WhatsApp** - Your own account
- ✅ **Automatic sending** - Checks every minute
- ✅ **Real-time updates** - Status updates in Firebase
- ✅ **Error handling** - Logs failures
- ✅ **Session persistence** - No need to scan QR every time

---

## 🖥️ Running the Server

### Development (with auto-restart)
```powershell
npm run dev
```

### Production
```powershell
npm start
```

### Keep it running 24/7

**Option 1: Use PM2 (Recommended)**
```powershell
npm install -g pm2
pm2 start server.js --name whatsapp-reminder
pm2 save
pm2 startup
```

**Option 2: Run in background (Windows)**
```powershell
start /B node server.js
```

**Option 3: Use a VPS/Cloud Server**
- Deploy to Heroku, DigitalOcean, AWS, etc.
- Server runs 24/7 automatically

---

## 📱 Phone Number Format

When creating reminders, use international format:

✅ **Correct:**
- `+917020181674` (India)
- `+14155551234` (USA)
- `+447911123456` (UK)

The server automatically formats it to: `917020181674@c.us`

---

## 🔍 Monitoring

### View Logs
The server prints logs in real-time:
```
🔍 Checking for reminders at 11/10/2025, 12:30:00...
   ✅ Found 1 due reminder(s) to send!
   📤 Sending reminder to +917020181674...
   ✅ Message sent successfully to +917020181674
```

### Check Firebase
View sent reminders at:
https://console.firebase.google.com/project/rehanpro-6f322/database/rehanpro-6f322-default-rtdb/data

---

## 🆘 Troubleshooting

### "QR code not showing"
- Make sure you're in the `whatsapp-server` folder
- Run `npm install` first
- Try `npm start` again

### "WhatsApp disconnected"
- The server will try to reconnect automatically
- If it doesn't, restart the server
- You may need to scan QR code again

### "Message not sent"
- Check if phone number is correct format
- Make sure WhatsApp is active on your phone
- Check if the number is saved in your contacts (recommended)

### "serviceAccountKey.json not found"
- Download it from Firebase Console (Step 1 above)
- Make sure it's in the `whatsapp-server` folder
- File name must be exactly `serviceAccountKey.json`

---

## 💡 Pro Tips

### Tip 1: Keep Server Running
Use PM2 to keep the server running even after closing terminal:
```powershell
npm install -g pm2
pm2 start server.js --name whatsapp-reminder
pm2 logs whatsapp-reminder
```

### Tip 2: Save Contacts
Save recipient numbers in your WhatsApp contacts for better delivery.

### Tip 3: Test First
Create a test reminder for 2 minutes from now to verify it works.

### Tip 4: Monitor Logs
Keep an eye on the terminal to see when messages are sent.

### Tip 5: Backup Session
The `.wwebjs_auth` folder contains your WhatsApp session.
Back it up to avoid scanning QR code again.

---

## 🔒 Security

### Important Notes:
1. **Never commit** `serviceAccountKey.json` to Git
2. **Keep** `.wwebjs_auth` folder private
3. **Don't share** your Firebase credentials
4. **Use** `.gitignore` (already configured)

---

## 📊 Comparison: whatsapp-web.js vs Twilio

| Feature | whatsapp-web.js | Twilio |
|---------|-----------------|--------|
| **Cost** | 🆓 FREE | 💰 ~₹0.40/message |
| **Setup** | Scan QR once | Sign up + verify |
| **Recipients** | Any WhatsApp user | Must join sandbox |
| **Limits** | Your WhatsApp limits | Pay per message |
| **Server** | Must run 24/7 | Cloud-based |
| **Best for** | Personal/Testing | Production/Business |

---

## 🎯 When to Use What

### Use whatsapp-web.js (This Server) if:
- ✅ You want it FREE
- ✅ Personal or testing use
- ✅ Can keep server running
- ✅ Don't mind scanning QR once

### Use Twilio if:
- ✅ Production/business use
- ✅ Need 100% uptime guarantee
- ✅ Don't want to manage server
- ✅ Okay with paying per message

---

## 🚀 Deployment Options

### Option 1: Run on Your Computer
- Easiest for testing
- Free
- Must keep computer on

### Option 2: VPS (DigitalOcean, Linode)
- $5-10/month
- Runs 24/7
- Full control

### Option 3: Heroku
- Free tier available
- Easy deployment
- May sleep after inactivity

### Option 4: AWS/GCP
- Free tier available
- Scalable
- More complex setup

---

## 📝 Example Usage

### Create a Reminder in Your App
```
Phone: +917020181674
Message: "Meeting at 3 PM today!"
Date: 2025-10-11
Time: 14:45
```

### Server Output
```
🔍 Checking for reminders at 11/10/2025, 14:45:00...
   ✅ Found 1 due reminder(s) to send!
   📤 Sending reminder to +917020181674...
   ✅ Message sent successfully to +917020181674
```

### User Receives
WhatsApp message: "Meeting at 3 PM today!" 📱

---

## ✅ Checklist

- [ ] Firebase service account key downloaded
- [ ] Saved as `serviceAccountKey.json` in whatsapp-server folder
- [ ] Dependencies installed (`npm install`)
- [ ] Server started (`npm start`)
- [ ] QR code scanned with WhatsApp
- [ ] "WhatsApp client is ready!" message shown
- [ ] Test reminder created
- [ ] Test message received on WhatsApp

---

## 🎉 You're All Set!

Your FREE WhatsApp reminder server is now running!

**What happens now:**
- ✅ Server checks for reminders every minute
- ✅ Sends WhatsApp messages automatically
- ✅ Updates status in Firebase
- ✅ Works as long as server is running

**Cost: ₹0 (Completely FREE!)** 🎊

---

## 📞 Support

If you need help:
1. Check the troubleshooting section above
2. View server logs for error messages
3. Check Firebase Console for data
4. Ensure WhatsApp is active on your phone

---

**Made with ❤️ by Rehan Samlewale**
