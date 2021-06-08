const express = require('express');
const router = express.Router();
const {Client, Environment} = require('square');
const {v4} = require('uuid');
require('dotenv').config();
const braintree = require('braintree');


const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'bn2n77yc5n3p8zr4',
    publicKey: '8gppvwzh6cb7z9r7',
    privateKey: 'a9c153dcd132980f34431c80bb122533'
});


router.get('/', function (req, res) {
    res.send('Auth');
});

router.post('/make', function (req, res) {
    let idempotencyKey = v4();
    const amount = req.body.amount;
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

router.post('/braintree', function (req, res) {
    const amount = parseFloat(req.body.amount);
    const nonceFromClient = req.body.payment_method_nonce;
    const deviceData = req.body.device_data;
    console.log(deviceData);
    console.log(nonceFromClient);
    console.log(amount);

    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromClient,
        deviceData: deviceData,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err != null) {
            console.log(err);
        } else {
            console.log(result);
            res.json({
                result: result
            })
        }
    })

});


module.exports = router;
