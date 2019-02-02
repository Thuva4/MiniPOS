let mongoose = require("mongoose");
let categories = ["food", "drink", "household"];

let ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v>=0;
            },
            message: "Price should be in greater than 0!"
        }
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return categories.includes(v.toLowerCase());
            },
            message: `Catergory shoud be one of followings: ${categories}`
        }
    },
    discountPercentage: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v>=0  && v<=100 ;
            },
            message: "Pecentage should be in 0 to 100 range!"
        }
    }
});

let Item = mongoose.model("Item", ItemSchema);

module.exports = Item;