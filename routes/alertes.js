const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');


router.get('/', async (req, res) => {
    const db = admin.firestore();

    const alertes = [];
    const snapshot = await db.collection('alertes').get();
    snapshot.forEach((doc) => {
        alertes.push(doc);
    });
    res.json(alertes);
});

router.post('/', async (req, res) => {
    const db = admin.firestore();
    const departEncoded = req.body.depart;
    const arriveeEncoded = req.body.arrivee;
    const postID = req.body.postID;

    const departDecoded = JSON.parse(departEncoded);
    const arriveeDecoded = JSON.parse(arriveeEncoded);
    console.log(departDecoded.city);
    console.log(arriveeDecoded.city);
    const users = [];
    const snapshotAlertes = await db.collection('alertes').get();
    snapshotAlertes.forEach((doc) => {
        const alerteDepart = doc.get("depart");
        const alerteArrivee = doc.get("arrivee");

        if (alerteDepart["city"] === departDecoded.city && alerteArrivee["city"] === arriveeDecoded.city) {
            users.push(doc.get("uid"));
        }
    });
    console.log(users);
    await Promise.all(users.map( ( async uid => {
        const snapshotUser = await db.collection('users').doc(uid).get();
        const token = snapshotUser.get("token");
        const message = {
            notification: {
                title: 'Aircolis',
                body: 'Un voyage correspond à votre alerte',
            },
            token: token,
            data: {
                "postID": postID
            }
        };
        admin.messaging().send(message);
    })));

    res.end("save");
});

router.post('/notif', async (req, res) => {

    const token = "dJ1YOuJKNE5sp09riDC9M_:APA91bErlZhoYrhgQz2JnfNKW2BzGiojcc7VqtrvTUs9UQbCr0gcVIN6mcDdZG6l2mSXxTgOxWrc7h2A1WoCdJHrw-iheEFl94YPfe-VgpB1dlNurdfu9XrZsp7RkFZ-oIPmz6Pj2aNy"; //req.body.token;
    const message = {
        notification: {
            title: 'Aircolis',
            body: 'Un voyage correspond à votre alerte',
        },
        token: token,
        data: {
            "postID": "fwRDktS5GACTpyeD2hZs",
        }
    };
    admin.messaging().send(message);
    res.end('Good');
});

module.exports = router;
