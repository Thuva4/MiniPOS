/* eslint-disable no-undef */
let sinon = require("sinon");

let Order = require("../../../../models/schema/Order");
let getOrders = require("../../../../models/operations/orders/getOrders");

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
 
describe("get order Function", function() {
    beforeEach(function() {
        sinon.stub(Order, "find");
    });
 
    afterEach(function() {
        Order.find.restore();
    });

    it("should send all order details", function() {

        let expectedModels = [testOrder];
        Order.find.yields(null, expectedModels);
        let req = { };
        let res = {};
        let callback = sinon.stub();
 
        getOrders(req, res, callback);
        

        sinon.assert.calledWith(callback, null, expectedModels);
    });
});


