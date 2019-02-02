/* eslint-disable no-undef */
let expect = require("chai").expect;
 
let User = require("../../../models/schema/User");
let bcrypt = require("bcrypt");

describe("user", function() {
    it("should be invalid if username is empty", function(done) {
        let user = new User();
        user.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    it("should be invalid if password is empty", function(done) {
        let user = new User();
        user.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it("should be true if password match", function(done) {
        let user = new User();
        user.username = "user";
        bcrypt.hash("user", 10, function (err, hash){
            if (err) {
                return next(err);
            }
            user.password = hash;
            return;
        });
        user.comparePassword("user", function(err, isMatch){
            if(!err) {
                expect(isMatch).to.equal(true);
            }
            done();
        });
    });

    it("should be false if password don't match", function(done) {
        let user = new User();
        user.username = "user";
        bcrypt.hash("user", 10, function (err, hash){
            if (err) {
                return next(err);
            }
            user.password = hash;
            return;
        });
        user.comparePassword("user", function(err, isMatch){
            if(!err) {
                expect(isMatch).to.equal(false);
            }
            done();
        });
    });


});