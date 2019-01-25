let express = require("express");
let router  = express.Router();

let login = require("../models/operations/users/login");
let register = require("../models/operations/users/register");
let logout = require("../models/operations/users/logout");


router.post("/login", function(req, res){
    login(req, res, function(err, data) {
        if(err) {
            res.json({"error": true, "message": "Error logged in"});
        } else {
            if(data){
                res.json({"success": true, "Message": "Authentication"});
            } else {
                res.json({"success": false, "Message": "Athentication is failed"});
            }
        }
    });
});

router.get("/logout", require("../service/auth"), function(req, res){
    logout(req, res, function(err, data) {
        if(err) {
            res.json({"error": true, "message": err});
        } else {
            res.json({"success": true, "data": data});
        }
    });
});

router.get("/user", function(req, res){
    logout(req, res, function(err, data){
        if(err) {
            res.status(400).send(err);
        } else{
            res.status(200).send(data);
        }
    });
});

router.post("/user", function(req, res){
    register(req, res, function(err, data){
        if(err) {
            res.status(400).send(err);
        } else{
            res.status(200).send(data);
        }
    });
});


module.exports = router;