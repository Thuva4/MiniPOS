let Order = require("../../schema/Order");

let addOrder = function(req, res, callback) {
    if (req.body){
        let orderData = {
            ...req.body,
            userId: req.session.userId,
            orderedDate: new Date(req.body.orderedDate)
        };
        Order.create(orderData, function (err, item) {
            if (err) {
                let error = {
                    status: 400,
                    message: err.message
                };
                callback(error, null);
            } else {
                callback(null, item);
            }
        });
    } else {
        let error = {
            status: 400,
            message: "Order should contain these propertise: createdDate, \
openStatus, discountPercentage, userId  and items!"
        };
        callback(error, null);
    }
};

module.exports = addOrder;