/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
var expect = require("chai").expect;
var sinon = require("sinon");

let Item = require("../../../../models/schema/Item");
let searchItems = require("../../../../models/operations/items/searchItems");
 
describe("search Item Function", function() {
    beforeEach(function() {
        sinon.stub(Item, "find");
    });
 
 
    afterEach(function() {
        Item.find.restore();
    });
 
    it("should send all items", function() {
        var testItem1 =  {
            "_Id": "5c48575af0c54979d14846c7",
            "name": "Apple Red",
            "category": "Food",
            "price": 55
        };
        var testItem2 = {
            "_Id": "5c48575af0c54979d14846c7",
            "name": "Apple Green",
            "category": "Food",
            "price": 55
        };

        var expectedModels = [testItem1, testItem2];
        Item.find.yields(null, expectedModels);
        var req = { query: { } };
        let res = {};
        let callback = sinon.stub();
 
        searchItems(req, res, callback);
 
        sinon.assert.calledWith(callback, null, expectedModels);
    });
});


