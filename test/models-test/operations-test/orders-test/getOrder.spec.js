/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var expect = require("chai").expect;
var sinon = require("sinon");

let Order = require("../../../../models/schema/Order");
let getOrder = require("../../../../models/operations/orders/getOrder");

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
 
describe("search Item Function", function() {
    beforeEach(function() {
        sinon.stub(Order, "find");
    });
 
    afterEach(function() {
        Order.find.restore();
    });
 
    it("should send all items", function() {

        var expectedModels = [testOrder];
        Order.find.yields(null, expectedModels);
        var req = { params: {}};
        let res = {};
        let callback = sinon.stub();
 
        getOrder(req, res, callback);
        
        let error = { message: "Order Id is required", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should send all items", function() {

        var expectedModels = [testOrder];
        Order.find.yields(null, expectedModels);
        var req = { params: {orderId: "random"}};
        let res = {};
        let callback = sinon.stub();
 
        getOrder(req, res, callback);
        
        let error = { message: "Order Id is not valid", status: 400 }; 

        sinon.assert.calledWith(callback, error, null);
    });

    it("should send all items", function() {

        var expectedModels = [testOrder];
        Order.find.yields(null, testOrder);
        var req = { params: {orderId: "5c4aba45988293116fce53b2"}};
        let res = {};
        let callback = sinon.stub();
 
        getOrder(req, res, callback);
        

        sinon.assert.calledWith(callback, null, testOrder);
    });
});


