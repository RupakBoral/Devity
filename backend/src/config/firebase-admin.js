const admin = require('firebase-admin');

// For now, we'll use a simplified approach without service account
// In production, you should use a proper service account key
const firebaseConfig = {
  projectId: "devity-c6e38",
  // Add other config if needed
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Uses default credentials
    projectId: firebaseConfig.projectId
  });
}

const auth = admin.auth();

module.exports = { auth, admin };
