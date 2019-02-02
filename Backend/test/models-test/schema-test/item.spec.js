/* eslint-disable no-undef */
let expect = require("chai").expect;
 
let Item = require("../../../models/schema/Item");
 
describe("item", function() {
    it("should be invalid if name is empty", function(done) {
        let item = new Item();
        item.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it("should be invalid if price is empty", function(done) {
        let item = new Item();
        item.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if price is invalid", function(done) {
        let item = new Item();
        item.price = -111;
        item.validate(function(err) {
            expect(err.errors.price).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is empty", function(done) {
        let item = new Item();
        item.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is invalid", function(done) {
        let item = new Item();
        item.discountPercentage = 111;
        item.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if category is empty", function(done) {
        let item = new Item();
        item.validate(function(err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });

    it("should be invalid if category is invalid", function(done) {
        let item = new Item();
        item.category = "foooood";
        item.validate(function(err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });

    it("should convert category to lower case before saving", function() {
        const item = new Item();
        item.category = "FOOD";
        expect(item.category).to.equal("food");
    });


});