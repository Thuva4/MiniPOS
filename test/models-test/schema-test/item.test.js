/* eslint-disable no-undef */
var expect = require("chai").expect;
 
var Item = require("../../../models/schema/Item");
 
describe("item", function() {
    it("should be invalid if name is empty", function(done) {
        var item = new Item();
        item.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it("should be invalid if price is empty", function(done) {
        var item = new Item();
        item.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if price is invalid", function(done) {
        var item = new Item();
        item.price = -111;
        item.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is empty", function(done) {
        var item = new Item();
        item.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is invalid", function(done) {
        var item = new Item();
        item.discountPercentage = 111;
        item.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if category is empty", function(done) {
        var item = new Item();
        item.validate(function(err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });

    it("should be invalid if category is invalid", function(done) {
        var item = new Item();
        item.category = "foooood";
        item.validate(function(err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });
});