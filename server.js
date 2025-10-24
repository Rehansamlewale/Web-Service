/**
 * WhatsApp Reminder Server
 * FREE WhatsApp messaging using whatsapp-web.js
 * Connects to Firebase Realtime Database and sends reminders automatically
 */

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin
console.log('🔧 Initializing Firebase...');

// Try environment variables first, then fall back to service account file
let firebaseConfig;

// Check if we're in production (Render sets NODE_ENV=production)
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  console.log('🔧 Running in production mode');
  // In production, require all environment variables
  const requiredVars = [
    'FIREBASE_TYPE',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_PRIVATE_KEY',
    'FIREBASE_PRIVATE_KEY_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_CLIENT_ID',
    'FIREBASE_CLIENT_CERT_URL',
    'FIREBASE_DATABASE_URL'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Error: Missing required Firebase environment variables:');
    missingVars.forEach(varName => console.error(` - ${varName}`));
    console.error('\nPlease set all required Firebase environment variables in Render dashboard');
    process.exit(1);
  }

  firebaseConfig = {
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
      token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  };
} else {
  // In development, try to use service account file
  console.log('🔧 Running in development mode');
  console.log('🔧 Attempting to use serviceAccountKey.json');
  try {
    const serviceAccount = require('./serviceAccountKey.json');
    firebaseConfig = {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://rehanpro-6f322-default-rtdb.firebaseio.com"
    };
    console.log('✅ Using local service account file');
  } catch (error) {
    console.error('❌ Error: serviceAccountKey.json not found!');
    console.error('Please either:');
    console.error('1. Create a serviceAccountKey.json file in the project root, or');
    console.error('2. Set all required Firebase environment variables');
    process.exit(1);
  }
}

// Initialize Firebase
try {
  admin.initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firebase:', error.message);
  process.exit(1);
}

const db = admin.database();
// Initialize WhatsApp Client with Render-compatible puppeteer config
const puppeteerConfig = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu'
  ]
};

// Use system Chromium if available (Docker/Render)
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  puppeteerConfig.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
}

const client = new Client({
  authStrategy: new LocalAuth(), // Saves session locally
  puppeteer: puppeteerConfig
});

// QR Code for first-time authentication
client.on('qr', async (qr) => {
  console.log('\n📱 Scan this QR code with your WhatsApp app:\n');
  qrcode.generate(qr, { small: true });
  console.log('\nOpen WhatsApp → Linked Devices → Link a device\n');
  
  // Save QR to Firebase for remote scanning (useful for Render deployment)
  try {
    await db.ref('whatsapp_qr').set({
      qr: qr,
      timestamp: new Date().toISOString()
    });
    console.log('✅ QR code also saved to Firebase at: whatsapp_qr');
    console.log('   You can view it in your app or Firebase Console\n');
  } catch (error) {
    console.error('⚠️ Could not save QR to Firebase:', error.message);
  }
});

// Client ready
client.on('ready', () => {
  console.log('✅ WhatsApp client is ready!');
  console.log('🚀 Reminder server is now running...\n');
  
  // Start checking for reminders
  startReminderChecker();
});

// Authentication success
client.on('authenticated', () => {
  console.log('✅ WhatsApp authenticated successfully!');
});

// Handle disconnection
client.on('disconnected', (reason) => {
  console.log('⚠️ WhatsApp disconnected:', reason);
  console.log('Attempting to reconnect...');
});

// Initialize client
console.log('🔄 Initializing WhatsApp client...');
client.initialize();

/**
 * Check for pending reminders every minute
 */
function startReminderChecker() {
  console.log('⏰ Starting reminder checker (runs every minute)...\n');
  
  // Check immediately
  checkAndSendReminders();
  
  // Then check every minute
  setInterval(checkAndSendReminders, 60000); // 60 seconds
}

/**
 * Check database for due reminders and send them
 */
async function checkAndSendReminders() {
  try {
    const now = new Date();
    console.log(`\n🔍 Checking for reminders at ${now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}...`);
    
    // Get all pending reminders
    const remindersRef = db.ref('reminderMessages');
    const snapshot = await remindersRef
      .orderByChild('status')
      .equalTo('pending')
      .once('value');
    
    if (!snapshot.exists()) {
      console.log('   No pending reminders found.');
      return;
    }
    
    const reminders = snapshot.val();
    const reminderIds = Object.keys(reminders);
    
    // Filter reminders that are due
    const dueReminders = reminderIds.filter(id => {
      const scheduledTime = new Date(reminders[id].scheduledDateTime);
      return scheduledTime <= now;
    });
    
    if (dueReminders.length === 0) {
      console.log(`   Found ${reminderIds.length} pending reminder(s), but none are due yet.`);
      return;
    }
    
    console.log(`   ✅ Found ${dueReminders.length} due reminder(s) to send!`);
    
    // Process each due reminder
    for (const reminderId of dueReminders) {
      const reminder = reminders[reminderId];
      await sendReminderMessage(reminderId, reminder);
    }
    
  } catch (error) {
    console.error('❌ Error checking reminders:', error);
  }
}

/**
 * Send a WhatsApp reminder message
 */
async function sendReminderMessage(reminderId, reminder) {
  try {
    console.log(`\n   📤 Sending reminder to ${reminder.phoneNumber}...`);
    
    // Format phone number: remove all non-digits and add @c.us
    const formattedNumber = reminder.phoneNumber.replace(/[^0-9]/g, '');
    const chatId = `${formattedNumber}@c.us`;
    
    // Send the message
    await client.sendMessage(chatId, reminder.message);
    
    console.log(`   ✅ Message sent successfully to ${reminder.phoneNumber}`);
    
    // Update status in Firebase
    await db.ref(`reminderMessages/${reminderId}`).update({
      status: 'sent',
      sentAt: new Date().toISOString(),
      sentVia: 'whatsapp-web.js'
    });
    
    // Log to messageLogs
    await db.ref('messageLogs').push({
      reminderId: reminderId,
      phoneNumber: reminder.phoneNumber,
      message: reminder.message,
      status: 'sent',
      sentVia: 'whatsapp-web.js',
      sentAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error(`   ❌ Failed to send reminder to ${reminder.phoneNumber}:`, error.message);
    
    // Update status to failed
    await db.ref(`reminderMessages/${reminderId}`).update({
      status: 'failed',
      error: error.message,
      failedAt: new Date().toISOString()
    });
    
    // Log failure
    await db.ref('messageLogs').push({
      reminderId: reminderId,
      phoneNumber: reminder.phoneNumber,
      message: reminder.message,
      status: 'failed',
      error: error.message,
      failedAt: new Date().toISOString()
    });
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n\n⚠️ Shutting down gracefully...');
  await client.destroy();
  process.exit(0);
});

console.log('═══════════════════════════════════════════════════════');
console.log('  📱 WhatsApp Reminder Server');
console.log('  🆓 100% FREE - No Twilio needed!');
console.log('  🔥 Connected to Firebase: rehanpro-6f322');
console.log('═══════════════════════════════════════════════════════\n');
