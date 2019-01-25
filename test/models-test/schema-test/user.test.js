/* eslint-disable no-undef */
var expect = require("chai").expect;
 
var User = require("../../../models/schema/User");
 
describe("user", function() {
    it("should be invalid if username is empty", function(done) {
        var user = new User();
        user.validate(function(err) {
            expect(err.errors.username).to.exist;
            done();
        });
    });

    it("should be invalid if password is empty", function(done) {
        var user = new User();
        user.validate(function(err) {
            expect(err.errors.password).to.exist;
            done();
        });
    });
});