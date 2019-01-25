let Order = require("../../../schema/Order");
let mongoose = require("mongoose");


let addOrderedItem = function(req, res, callback) {
    if(req.params.orderId){
        let orderId = req.params.orderId;
        if (mongoose.Types.ObjectId.isValid(orderId)) {
            if (req.body){
                let itemData = {...req.body};
                Order.findById(orderId)
                    .then((order) => {
                        if(order) {
                            if(itemData.itemId) {
                                let item = order.items.find(item => item.itemId == itemData.itemId);
                                if(item){
                                    let error = {
                                        status: 400,
                                        message: "Item already exists. Update the item to change the quantity!"
                                    };
                                    callback(null, error);
                                } else {
                                    order.items = order.items.concat([itemData]);       
                                    return order.save();
                                }
                            } else {
                                let error = {
                                    status: 400,
                                    message: "itemId is required"
                                };
                                callback(error, null);
                            }
                        } else {
                            let error = {
                                status: 500,
                                message: "Order is not found"
                            };
                            callback(error, null);
                        }
                    }).then((item) => {
                        callback(null, item);
                    }).catch(error => {
                        let err = {
                            status: 500,
                            message: error.message
                        };
                        callback(err, null);
                    });
            } else {
                let error = {
                    status: 400,
                    message: "Item should contains name, price, quantity, discountPercentage and category."
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

module.exports = addOrderedItem;