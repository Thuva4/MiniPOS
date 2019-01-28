let express = require("express");

let router = express.Router();

let addOrder = require("../models/operations/orders/addOrder");
let getOrders = require("../models/operations/orders/getOrders");
let getOrder = require("../models/operations/orders/getOrder");

router.get("/:orderId", function(req, res){
    getOrder(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

router.get("/", function(req, res){
    getOrders(req, res, function(err, data){
        if(err) {
            res.status(err.status).json(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

router.post("/", function(req, res){
    addOrder(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

module.exports = router;