/* eslint-disable no-undef */
let sinon = require("sinon");

let Order = require("../../../../models/schema/Order");
let getOrderedItems = require("../../../../models/operations/orders/orderedItem/getOrderedItems");

let testOrderedItem =  {
    "amount": 1000,
    "name": "Apple",
    "category": "food",
    "price": 100,
    "discountPercentage": 0,
    "itemId": "5c48575af0c54979d14846c7",
    "quantity": 10,
    "_id": "5c4aba45988293116fce53b3"
};

let expectedModels = testOrderedItem;

describe("get ordered Items Function", function() {
    beforeEach(function() {
        sinon.stub(Order, "find");
    });
 
    afterEach(function() {
        Order.find.restore();
    });
 
    it("should be error if orderId is empty", function() {

        Order.find.yields(null, expectedModels);
        let req = { params: {}};
        let res = {};
        let callback = sinon.stub();
 
        getOrderedItems(req, res, callback);
        
        let error = { message: "Order Id is required", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should error if orderId is invalid", function() {

        Order.find.yields(null, expectedModels);
        let req = { params: {orderId: "random"}};
        let res = {};
        let callback = sinon.stub();
 
        getOrderedItems(req, res, callback);
        
        let error = { message: "Order Id is not valid", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should send order details", function() {

        Order.find.yields(null, expectedModels);
        let req = { params: {orderId: "5c4aba45988293116fce53b2"}};
        let res = {};
        let callback = sinon.stub();
 
        getOrderedItems(req, res, callback);
        

        sinon.assert.calledWith(callback, null, testOrderedItem);
    });
});


