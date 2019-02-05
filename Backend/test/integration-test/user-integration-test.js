/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let request = require("supertest");

let app = require("../../server");
let should =  require("chai").should();
let mongoose = require("mongoose");
 
let Cookies;
 
describe("Functional test login:", function () {

    after(function (done) {   
        mongoose.connection.dropDatabase(function(){
            done();
        });    
    });

    it("should create user session for valid user", function (done) {
        request(app)
            .post("/api/auth/login")
            .set("Accept","application/json")
            .send({"username": "test", "password": "test"})
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                should.exist(res.body._id);
                Cookies = res.headers["set-cookie"].pop().split(";")[0];
                done();
            });
    });

    it("should destroy user session for valid user", function (done) {
        request(app)
            .post("/api/auth/logout")
            .set("Accept","application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });
    
});