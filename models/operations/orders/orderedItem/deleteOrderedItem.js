let Order = require("../../../schema/Order");
let mongoose = require("mongoose");


let deleteOrderedItem = function(req, res, callback) {
    if(req.params.orderId){
        let orderId = req.params.orderId;
        if (mongoose.Types.ObjectId.isValid(orderId)) {
            if(req.params.itemId){
                let itemId = req.params.itemId;
                if (mongoose.Types.ObjectId.isValid(itemId)){
                    Order.findById(orderId)
                        .then((order) => {
                            const items = order.items.filter(orderItem => orderItem.itemId != itemId);
                            order.items = items; 
                            return order.save(); 
                        })
                        .then((order) => {
                            callback(null, order);
                        })
                        .catch( (error) => {
                            let err = {
                                status: 500,
                                message: error.message
                            };
                            callback(err);
                        });
                } else {
                    let error = {
                        status: 400,
                        message: "Item Id is not valid"
                    };
                    callback(error, null);
                }
            } else {
                let error = {
                    status: 400,
                    message: "Item Id is required"
                };
                callback(error, null);
            }
        } else{
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

module.exports = deleteOrderedItem;