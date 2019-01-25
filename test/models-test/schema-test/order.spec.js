/* eslint-disable no-undef */
var expect = require("chai").expect;
 
let Order = require("../../../models/schema/Order");
 
describe("Order", function() {
    it("should be invalid if date is empty", function(done) {
        var order = new Order();
        order.validate(function(err) {
            expect(err.errors.createdDate).to.exist;
            done();
        });
    });

    it("should be invalid if date is invalid", function(done) {
        var order = new Order();
        order.date = "invalid data";
        order.validate(function(err) {
            expect(err.errors.createdDate).to.exist;
            done();
        });
    });


    it("should be invalid if userId is empty", function(done) {
        var order = new Order();
        order.validate(function(err) {
            expect(err.errors.userId).to.exist;
            done();
        });
    });


    it("should be invalid if amount is empty", function(done) {
        var order = new Order();
        order.validate(function(err) {
            expect(err.errors.amount).to.exist;
            done();
        });
    });

    it("should be invalid if amount is invalid", function(done) {
        var order = new Order();
        order.price = -111;
        order.validate(function(err) {
            expect(err.errors.amount).to.exist;
            done();
        });
    });

    it("should be invalid if items is empty", function(done) {
        var order = new Order();
        order.validate(function(err) {
            expect(err.errors.items).to.exist;
            done();
        });
    });

    it("should be invalid if openStatus is empty", function(done) {
        var order = new Order();
        order.validate(function(err) {
            expect(err.errors.openStatus).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is empty", function(done) {
        var order = new Order();
        order.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should be invalid if discountPercentage is invalid", function(done) {
        var order = new Order();
        order.discountPercentage = 111;
        order.validate(function(err) {
            expect(err.errors.discountPercentage).to.exist;
            done();
        });
    });

    it("should calculate the total amount before saving", function(done) {
        let order = new Order();
        order.items.push({
            price: 10,
            quantity: 10,
            discountPercentage: 0
        });
        order.discountPercentage = 0;
        order.validate(function(){
            expect(order.amount).to.equal(order.items[0].price * order.items[0].quantity);
            done();
        });
    });

    it("should calculate the total amount before saving", function(done) {
        let order = new Order();
        order.items.push({
            price: 10,
            quantity: 10,
            discountPercentage: 0
        });
        order.discountPercentage = 10;
        order.validate(function(){
            expect(order.amount).to.equal(90);
            done();
        });
    });

    it("should calculate the total amount before saving", function(done) {
        let order = new Order();
        order.items.push({
            price: 10,
            quantity: 10,
            discountPercentage: 10
        });
        order.discountPercentage = 10;
        order.validate(function(){
            expect(order.amount).to.equal(81);
            done();
        });
    });

    
});