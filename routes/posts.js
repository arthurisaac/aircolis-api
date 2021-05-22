const express = require('express');
const router = express.Router();
const db = require('../database/database');

router.get('/', function (req, res) {
    const query = `SELECT *
                   FROM posts`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


router.get('/only_valid', function (req, res) {
    const query = `SELECT *
                   FROM posts
                   WHERE visible = 1
                     AND date_depart > NOW()`;
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    const query_service = `SELECT *
                           FROM posts
                           WHERE id = ?`;
    db.query(query_service, [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

router.post('/', function (req, res) {
    const arrival = JSON.stringify(req.body.arrival);
    const currency = req.body.currency;
    const date_arrivee = req.body.date_arrivee;
    const date_depart = req.body.date_depart;
    const departure = JSON.stringify(req.body.departure);
    const parcel_height = req.body.parcel_height;
    const parcel_length = req.body.parcel_length;
    const parcel_weight = req.body.parcel_weight;
    const payment_method = req.body.payment_method;
    const price = req.body.price;
    const tracking = req.body.tracking;
    const uid = req.body.uid;

    const query = `INSERT INTO posts
                   SET arrival        = ?,
                       currency       = ?,
                       date_arrivee   = ?,
                       date_depart    = ?,
                       departure      = ?,
                       parcel_height  = ?,
                       parcel_length  = ?,
                       parcel_weight  = ?,
                       payment_method = ?,
                       price          = ?,
                       tracking       = ?,
                       uid            = ?`;
    db.query(query, [
        arrival,
        currency,
        date_arrivee,
        date_depart,
        departure,
        parcel_height,
        parcel_length,
        parcel_weight,
        payment_method,
        price,
        tracking,
        uid
    ], (err) => {
        if (err) res.status(500).json(err);
        if (err) throw err;
        res.json({success: true});
    });
});

module.exports = router;