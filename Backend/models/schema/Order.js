let mongoose = require("mongoose");
let OrderedItemSchema = require("./OrderedItem").OrderedItemSchema;

let OrderSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        required: true
    },
    openStatus: {
        type: Boolean,
        required:  true
    },
    modifiedDate:{
        type: Date,
        required: true
    },
    items: {
        type: [OrderedItemSchema],
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
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
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v>=0 && v<1000000;
            },
            message: "Amount should be in the range of 0 to 1 million!"
        }
    }
});

OrderSchema.pre("validate", function (next) {   
    this.modifiedDate = new Date(); 
    this.amount = this.items.reduce(function(accumulator, item) {
        return accumulator + (item.price * item.quantity * (1 - item.discountPercentage / 100));
    }, 0);
    this.amount = this.amount - (this.amount * this.discountPercentage / 100);
    next();
});

let Order = mongoose.model("Order", OrderSchema);

module.exports = Order;