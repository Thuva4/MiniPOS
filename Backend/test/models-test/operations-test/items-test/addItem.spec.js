/* eslint-disable no-undef */
let sinon = require("sinon");

let Item = require("../../../../models/schema/Item");
let addItem = require("../../../../models/operations/items/addItem");
 
describe("Add Item Function", function() {
    beforeEach(function() {
        sinon.stub(Item, "create");
    });
 
    afterEach(function() {
        Item.create.restore();
    });
 
    it("should send all items", function() {
        let testItem1 =  {
            "name": "Apple Red",
            "category": "Food",
            "price": 55
        };

        Item.create.yields(null, testItem1);
        let req = { body: { } };
        let res = {};
        let callback = sinon.stub();
 
        addItem(req, res, callback);
 
        sinon.assert.calledWith(callback, null, testItem1);
    });
});


