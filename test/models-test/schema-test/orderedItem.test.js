/* eslint-disable no-undef */
var expect = require("chai").expect;
 
let OrderedItem = require("../../../models/schema/OrderedItem").OrderedItem;
 
describe("orderedItem", function() {
    it("should be invalid if name is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it("should be invalid if itemId is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.itemId).to.exist;
            done();
        });
    });


    it("should be invalid if price is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if price is invalid", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.price = -111;
        orderedItem.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if amount is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if amount is invalid", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.price = -111;
        orderedItem.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if quantity is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if quantity is invalid", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.price = -111;
        orderedItem.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is invalid", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.discountPercentage = 111;
        orderedItem.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if category is empty", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.validate(function(err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });

    it("should be invalid if category is invalid", function(done) {
        var orderedItem = new OrderedItem();
        orderedItem.category = "foooood";
        orderedItem.validate(function(err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });
});