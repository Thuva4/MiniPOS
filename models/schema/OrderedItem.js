let mongoose = require("mongoose");
let categories = ["food", "drink", "household"];


let OrderedItemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v>=0;
            },
            message: "Price should be greater than 0!"
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
            message: "Discount percentage should be in the range of 0 to 100!"
        }
    },
    quantity: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v>=0 && v<1000000;
            },
            message: "Quantity should be in the range of 0 to 1 million!"
        }
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v>=0;
            },
            message: "Amount should be in greater than 0!"
        }
        
    }
});

OrderedItemSchema.pre("validate", function (next) {
    this.amount = (this.price * this.quantity) * (1 - this.discountPercentage / 100);
    next();
});

let OrderedItem =  mongoose.model("OrderdItem", OrderedItemSchema);


module.exports = { 
    OrderedItemSchema: OrderedItemSchema, 
    OrderedItem: OrderedItem };