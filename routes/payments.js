const express = require('express');
const router = express.Router();
//const stripe = require('stripe')('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');
require('dotenv').config();
//const {Client, Environment} = require('square');
//const {v4} = require('uuid');
//const braintree = require('braintree');
//const stripe = require('stripe')('sk_test_51J5XvyDF00kloegatAd9Y0S9IzI5nzwpXGIiytbCRSvXH3m0x9iMMnRGFyIocvUie1I6HRIki8uVkjnxAQnO5hw000V8hALvfS'); //test hakeem
const stripe = require('stripe')('sk_test_51J5X6BFq74Le5hMXw0fnHveTAOKYr5tcAilfUCwa20c32ZCNXDdgB3cA0mYoTEgdxgrol8r5Jjk4kEH0HC3SpCS900SpNi4018'); // test arthur


/*const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'bn2n77yc5n3p8zr4',
    publicKey: '8gppvwzh6cb7z9r7',
    privateKey: 'a9c153dcd132980f34431c80bb122533'
});*/


router.get('/', function (req, res) {
    res.send('Auth');
});

/*router.post('/make', function (req, res) {
    let idempotencyKey = v4();
    const amount = req.body.amount;
    const currency = req.body.currency;
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
    const currency = req.body.currency;
    console.log(deviceData);
    console.log(nonceFromClient);
    console.log(amount);
    console.log(currency);

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

});*/

router.post('/stripe',  async (req, res) => {
    console.log("paiement de " + parseFloat(req.body.amount) + " req.body.currency");
    const amount = parseFloat(req.body.amount);
    const paymentMethod = req.body.payment_method;
    const currency = req.body.currency;
    const stripeVendorAccount = 'acct_1032D82eZvKYlo2C';

    stripe.paymentIntents.create({
        amount: amount * 100,
        currency: currency,
        //application_fee_amount: 1,
        payment_method: paymentMethod,
        confirmation_method: 'automatic',
        confirm: true,
        description: req.query.description
    }, (err, paymentIntent) => {
        res.json({
            paymentIntent: paymentIntent,
            stripeVendorAccount: stripeVendorAccount
        })
    }).then(r => console.log(r))

    /*const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2020-08-27'}
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        customer: customer.id,
        payment_method: paymentMethod,
        confirmation_method: 'automatic',
        confirm: true,
    });
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        stripeVendorAccount: stripeVendorAccount
    });*/

    /*stripe.paymentMethods.create({
        payment_method: paymentMethod,
    },{
        stripeAccount: stripeVendorAccount,
    }, (err, rPaymentMethod) => {
        if (err != null) {
            console.log(err);
        } else {
            stripe.paymentIntents.create({
                amount: amount,
                currency: currency,
                //application_fee_amount: 1,
                payment_method: rPaymentMethod.id,
                confirmation_method: 'automatic',
                confirm: true,
                description: req.query.description
            }, (err, paymentIntent) => {
                res.json({
                    paymentIntent: paymentIntent,
                    stripeVendorAccount: stripeVendorAccount
                })
            }).then(r => console.log(r))
        }
    });*/


});


module.exports = router;
