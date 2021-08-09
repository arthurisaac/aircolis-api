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

router.post('/login', async (req, res) => {
    const db = admin.firestore();

    const username = req.body.username;
    const password = req.body.password;

    //if (req.body.username && req.body.username) {
        if (username === "admin" && password === "123456") {
            res.json({"success": 1, "message": "Authentiffication réussie"});
        } else {
            res.json({"success": 0, "message": "Echec authentification", "username": `${username}`});
        }
    /*} else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"message": "Paramètres manquants",}));
    }*/

});

module.exports = router;
