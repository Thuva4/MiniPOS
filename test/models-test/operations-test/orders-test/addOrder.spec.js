/* eslint-disable no-undef */
var sinon = require("sinon");

let Order = require("../../../../models/schema/Order");
let addOrder = require("../../../../models/operations/orders/addOrder");
 
describe("Add Item Function", function() {
    beforeEach(function() {
        sinon.stub(Order, "create");
    });
 
    afterEach(function() {
        Order.create.restore();
    });
 
    it("should add order", function() {
        var testOrder =  {
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

        Order.create.yields(null, testOrder);
        var req = { body: { } };
        let res = {};
        let callback = sinon.stub();
 
        addOrder(req, res, callback);
 
        sinon.assert.calledWith(callback, null, testOrder);
    });
});


