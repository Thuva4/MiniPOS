let Order = require("../../schema/Order");
let mongoose = require("mongoose");

let getOrder = function(req, res, callback) {
    if (req.params.orderId) {
        let orderId = req.params.orderId;
        if (mongoose.Types.ObjectId.isValid(orderId)) {
            
            Order.find({"_id": mongoose.Types.ObjectId(orderId)}, function(err, orders){
                if(err){
                    callback(err, null);
                } else{
                    callback(null, orders);
                }
            });
        } else {
            let error = {
                status: 400,
                message: "Order Id is not valid"
            };
            callback(error, null);
        }
    } else {
        let error = {
            status: 400,
            message: "Order Id is required"
        };
        callback(error, null);
    }
};

module.exports = getOrder;