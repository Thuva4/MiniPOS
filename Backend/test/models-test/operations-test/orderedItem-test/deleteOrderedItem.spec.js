/* eslint-disable no-undef */
let sinon = require("sinon");

let Order = require("../../../../models/schema/Order");
let deleteOrderedItem = require("../../../../models/operations/orders/orderedItem/deleteOrderedItem");

let testOrder =  {
    "_id": "5c4aba45988293116fce53b2",
    "amount": 920,
    "createdDate": "1995-12-16T21:54:00.000Z",
    "openStatus": true,
    "userId": "5c48575af0c54979d14846c4",
    "discountPercentage": 8,
    "__v": 0,
    "items": [
        {
            "amount": 1000,
            "name": "Apple",
            "category": "food",
            "price": 100,
            "discountPercentage": 0,
            "itemId": "5c48575af0c54979d14846c7",
            "quantity": 10,
            "_id": "5c4aba45988293116fce53b3"
        }
    ]
};


describe("get ordered Items Function", function() {
    beforeEach(function() {
        sinon.stub(Order, "findById");
    });
 
    afterEach(function() {
        Order.findById.restore();
    });
 
    it("should be error if orderId is empty", function() {

        Order.findById.yields(null, testOrder);
        let req = { params: {}};
        let res = {};
        let callback = sinon.stub();
 
        deleteOrderedItem(req, res, callback);
        
        let error = { message: "Order Id is required", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should error if orderId is invalid", function() {

        Order.findById.yields(null, testOrder);
        let req = { params: {orderId: "random"}};
        let res = {};
        let callback = sinon.stub();
 
        deleteOrderedItem(req, res, callback);
        
        let error = { message: "Order Id is not valid", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should be error if itemId is empty", function() {

        Order.findById.yields(null, testOrder);
        let req = { params: {orderId: "5c4aba45988293116fce53b2"}};
        let res = {};
        let callback = sinon.stub();
 
        deleteOrderedItem(req, res, callback);
        
        let error = { message: "Item Id is required", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should error if orderId is invalid", function() {

        Order.findById.yields(null, testOrder);
        let req = { params: {orderId: "5c4aba45988293116fce53b2", itemId: "random"}};
        let res = {};
        let callback = sinon.stub();
 
        deleteOrderedItem(req, res, callback);
        
        let error = { message: "Item Id is not valid", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    // it("should send order details", function() {

    //     Order.findById.resolves(null, testOrder);
    //     let req = { params: {
    //         orderId: "5c4aba45988293116fce53b2",
    //         itemId: "5c4aba45988293116fce53b6"}};
    //     let res = {};
    //     let callback = sinon.stub();
 
    //     deleteOrderedItem(req, res, callback);
        

    //     sinon.assert.called(callback);
    // });
});


