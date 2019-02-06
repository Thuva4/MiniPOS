/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let request = require("supertest");

let app = require("../../server");
let chai = require("chai");
let should =  chai.should();
let mongoose = require("mongoose");
let expect = chai.expect;
let Cookies;
 
describe("Functional test login:", function () {

    after(function (done) {   
        mongoose.connection.dropDatabase(function(){
            done();
        });    
    });

    it("should throug error if not a valid user", function (done) {
        let req = request(app).post("/api/auth/login");
        req.cookies = Cookies;
        req.send({"username": "unknownUser", "password": "test"}).end(function(err, res) { 
            expect(res.statusCode).to.equal(400); 
            done(); 
        }); 
    });

    it("should throug error if not a valid password", function (done) {
        let req = request(app).post("/api/auth/login");
        req.cookies = Cookies;
        req.send({"username": "test", "password": "unknownPassword"}).end(function(err, res) { 
            expect(res.statusCode).to.equal(400); 
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
        let req = request(app).get("/api/auth/logout");
        req.cookies = Cookies;
        req.end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            done(); 
        }); 
    });

    it("should send unauthorized status if there isn't a valid session", function (done) {
        let req = request(app).get("/api/auth/logout");
        req.end(function(err, res) { 
            expect(res.statusCode).to.equal(401); 
            done(); 
        }); 
    });
    
});