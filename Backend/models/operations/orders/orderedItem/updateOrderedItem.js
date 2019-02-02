let Order = require("../../../schema/Order");
let mongoose = require("mongoose");


let updateOrderedItem = function(req, res, callback) {
    if(req.params.orderId){
        let orderId = req.params.orderId;
        if (mongoose.Types.ObjectId.isValid(orderId)) {
            if(req.params.itemId){
                let itemId = req.params.itemId;
                if (mongoose.Types.ObjectId.isValid(itemId)){
                    if(req.body.quantity) {
                        Order.findById(orderId)
                            .then((order) => {
                                const updatedItems = order.items.map((item) => {
                                    if( item.itemId== itemId){
                                        return {
                                            ...item.toObject(),
                                            quantity: req.body.quantity
                                        };
                                    } else {
                                        return item;
                                    }
                                });
                                order.items = updatedItems;
                                return order.save(); 
                            })
                            .then((order) => {
                                callback(null, order);
                            })
                            .catch( (error) => {
                                let err = {
                                    status: 400,
                                    message: error.message
                                };
                                callback(err);
                            });
                    } else {
                        let error = {
                            status: 400,
                            message: "Request body is not valid"
                        };
                        callback(error, null);
                    }
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
                    message: "Item Id is required."
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
            message: "Object Id is required."
        };
        callback(error, null);
    }
};

module.exports = updateOrderedItem;