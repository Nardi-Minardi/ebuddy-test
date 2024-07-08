const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
});

module.exports = admin;
