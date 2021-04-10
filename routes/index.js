var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/notification', function(req, res) {
  const title = req.body.title;
  const token = req.body.token;
  const body = req.body.message;
  
  //console.log(req.params.token);
  if (token) {
    var topic = 'general';
    var message = {
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
      res.render('index', { title: 'Successfully sent message:' + response });
    })
    .catch((error) => {
      res.end(error);
      console.log('Error sending message:', error);
    });
  } else {
    res.end('Aucun token');
  }
  
});

module.exports = router;
