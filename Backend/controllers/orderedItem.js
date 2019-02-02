let express = require("express");
let router = express.Router();

let getOrderedItems = require("../models/operations/orders/orderedItem/getOrderedItems");
let addOrderedItem = require("../models/operations/orders/orderedItem/addOrderedItem");
let deleteOrderedItem = require("../models/operations/orders/orderedItem/deleteOrderedItem");
let updateOrderedItem = require("../models/operations/orders/orderedItem/updateOrderedItem");

router.get("/:orderId/items/", function(req,res){
    getOrderedItems(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

router.post("/:orderId/items/", function(req, res){
    addOrderedItem(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

router.delete("/:orderId/items/:itemId/", function(req, res){
    deleteOrderedItem(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

router.put("/:orderId/items/:itemId/", function(req, res){
    updateOrderedItem(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

module.exports = router;