const admin = require('firebase-admin');

// admin.initializeApp();
admin.initializeApp({
  credential: admin.credential.cert(require('../key/admin.json')),
});

// const firebase = require('firebase');
// firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { admin, db };
