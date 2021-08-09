const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post('/compte', async (req, res) => {
    const db = admin.firestore();

    const uid = req.body.uid;
    const verification = req.body.verification;

    if (req.body.uid !== undefined && req.body.verification !== undefined) {
        db.collection("users").doc(`${uid}`).update({
            "isVerified": verification
        })
            .then(() => {
                res.json({"success": 1, "message": "Marquée comme vérifié réussie"});
            })
            .catch((error) => {
                res.json({"success": 0, "message": "Une erreur s'est produite", "error": error});
            });
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"success": 0, "message": "Paramètres anquants",}));
    }

});

router.post('/souscription', async (req, res) => {
    const db = admin.firestore();

    const uid = req.body.uid;
    const subscription = req.body.subscription;

    if (req.body.uid !== undefined && req.body.subscription !== undefined) {
        db.collection("users").doc(`${uid}`).update({
            "subscription": subscription
        })
            .then(() => {
                res.json({"success": 1, "message": "Souscription mannuelle réussie"});
            })
            .catch((error) => {
                res.json({"success": 0, "message": "Une erreur s'est produite", "error": error});
            });
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({"success": 0, "message": "Paramètres anquants",}));
    }

});

module.exports = router;