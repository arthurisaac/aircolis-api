const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', async (req, res) => {
    const db = admin.firestore();

    const posts = [];
    const snapshot = await db.collection('posts').get();
    snapshot.forEach((doc) => {
        posts.push(doc.data());
        //console.log(doc.id, '=>', doc.data());
    });
    res.json(posts);
});

router.get('/only_valid', async (req, res) => {
    const db = admin.firestore();

    const posts = [];
    const today = new Date();
    const snapshot = await db.collection('posts')
        .where('dateDepart', ">=", today)
        .get();
    snapshot.forEach((doc) => {
        posts.push(doc.data());
        //console.log(doc.id, '=>', doc.data());
    });
    res.json(posts);
});

router.get('/:id', async (req, res) => {
    const db = admin.firestore();

    const doc = await db.collection('posts').doc(`${req.params.id}`).get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }
    res.json(doc.data());
});

module.exports = router;