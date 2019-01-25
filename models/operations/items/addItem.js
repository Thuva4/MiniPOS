let Item = require("../../schema/Item");

let addItem = function(req, res, callback) {
    if (req.body){
        var itemData = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        Item.create(itemData, function (err, item) {
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
            message: "Item should contains name, price and cotegory."
        };
        callback(error, null);
    }
};

module.exports = addItem;