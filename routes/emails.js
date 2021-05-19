const express = require('express');
const router = express.Router();
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();

router.get('/', function(req, res) {
    res.send('Email route');
});

router.post('/welcome', function(req, res) {

    const email = req.body.email;

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Sender
    let sender = SibApiV3Sdk.SendSmtpEmailSender();
    sender = {
        name: "Aircolis",
        email: "r.thur.light@gmail.com"
    };

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        sender: sender,
        to: [{
            email: email,
            name: 'Arthur'
        }],
        templateId: 1,
        params: {
            name: 'John',
            surname: 'Doe'
        },
        headers: {
            "Content-Type":"text/html",
            "charset":"utf-8"
        }
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + data);
        res.end(JSON.stringify(data));
    }, function(error) {
        console.error(error);
        res.end(JSON.stringify(error));
    });


});

router.post('/request', function(req, res) {

    const email = req.body.email;
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Sender
    let sender = SibApiV3Sdk.SendSmtpEmailSender();
    sender = {
        name: "Aircolis",
        email: "r.thur.light@gmail.com"
    };

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        sender: sender,
        to: [{
            email: email,
            name: 'Arthur'
        }],
        templateId: 2,
        headers: {
            "Content-Type":"text/html",
            "charset":"utf-8"
        }
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.json(data);
    }, function(error) {
        console.error(error);
        res.end(JSON.stringify(error));
    });


});

router.post('/accepted', function(req, res) {

    const email = req.body.email;

    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    // Sender
    let sender = SibApiV3Sdk.SendSmtpEmailSender();
    sender = {
        name: "Aircolis",
        email: "r.thur.light@gmail.com"
    };

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail = {
        sender: sender,
        to: [{
            email: email,
            name: 'Arthur'
        }],
        templateId: 3,
        headers: {
            "Content-Type":"text/html",
            "charset":"utf-8"
        }
    };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + data);
        res.end(JSON.stringify(data));
    }, function(error) {
        console.error(error);
        res.end(JSON.stringify(error));
    });


});

module.exports = router;
