let Order = require("../../schema/Order");

let getOrder = function(req, res, callback) {
    Order.find({"openStatus": true}, ["_id", "createdDate", "amount", "openStatus", "modifiedDate"] ,function(err, orders){
        if(err){
            callback(err, null);
        } else{
            callback(null, orders);
        }
    });
};

module.exports = getOrder;