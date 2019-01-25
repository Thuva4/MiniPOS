let express = require("express");

let addItem = require("../models/operations/items/addItem");
let searchItems = require("../models/operations/items/serachItems");
let router = express.Router();

router.get("/", function(req, res){
    searchItems(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

router.post("/", function(req, res){
    addItem(req, res, function(err, data){
        if(err) {
            res.status(err.status).send(err.message);
        } else{
            res.status(200).send(data);
        }
    });
});

module.exports = router;