let Item = require("../../schema/Item");

let searchItems = function(req, res, callback) {
    let query = {};
    if (req.query.name){
        query = { "name": { "$regex": req.query.name, "$options": "i" }};
    }
    Item.find( query, function(err, items){
        if(err){
            let error = {
                status: 500,
                message: err.message
            };
            callback(error, null);
        } else{
            callback(null, items);
        }
    });
};

module.exports = searchItems;