const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


router.get('/', async (req, res) => {
  const db = admin.firestore();

  const users = [];
  const snapshot = await db.collection('users').get();
  snapshot.forEach((doc) => {
    users.push(doc.data());
  });
  res.json(users);
});

module.exports = router;
