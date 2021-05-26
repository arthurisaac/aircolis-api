const express = require('express');
const router = express.Router();
const {Client, Environment} = require('square');
const {v4} = require('uuid');
require('dotenv').config();

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

router.get('/', function (req, res) {
    res.send('Auth');
});

router.post('/make', function (req, res) {
    let idempotencyKey = v4();
    const amount = parseFloat(req.body.amount);
    const sourceId = req.body.sourceId;
    try {
        client.paymentsApi.createPayment({
            sourceId: sourceId,
            idempotencyKey: idempotencyKey,
            amountMoney: {
                amount: amount,
                currency: 'USD'
            }
        }).then((resultat) => {
            console.log(resultat);
            res.end(JSON.stringify({"succes": true}));
        })

    } catch (error) {
        console.log(error);
        res.end(error);
    }
});


module.exports = router;
