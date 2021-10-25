const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

router.post('/notification', function (req, res) {
    const title = req.body.title;
    const token = req.body.token;
    const body = req.body.message;

    //console.log(req.params.token);
    if (token) {
        //var topic = 'general';
        const message = {
            notification: {
                title: title ?? 'Aircolis',
                body: body ?? 'Bienvenue sur aircolis',
            },
            //topic: topic
            token: token
        };
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                res.json({"succes": "Successfully sent: " + response});
                //res.render('index', { title: 'Successfully sent message:' + response });
            })
            .catch((error) => {
                res.end({"error": error});
                console.log('Error sending message:', error);
            });
    } else {
        res.json({"error": "Aucun token"});
    }

});

router.post('/notificationalerte', function (req, res) {
    const token = req.body.token;
    const postID = req.body.postID;

    //console.log(req.params.token);
    if (token) {
        //var topic = 'general';
        const message = {
            notification: {
                title: 'Aircolis',
                body: 'Un voyage correspond à votre alerte',
            },
            //topic: topic
            token: token,
            data: {
                "postID": postID
            }
        };
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
                res.json({"succes": "Successfully sent: " + response});
                //res.render('index', { title: 'Successfully sent message:' + response });
            })
            .catch((error) => {
                res.end({"error": error});
                console.log('Error sending message:', error);
            });
    } else {
        res.json({"error": "Aucun token"});
    }

});

module.exports = router;
