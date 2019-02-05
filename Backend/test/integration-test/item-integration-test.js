/* eslint-disable no-console */
/* eslint-disable no-undef */
let app = require("../../server");
let chai = require("chai");
let request = require("supertest");
let should =  require("chai").should();
let mongoose = require("mongoose");
let Cookies;
var expect = chai.expect;

describe("orders API", function() { 

    before(function (done) {   
        mongoose.connection.dropDatabase(function(){
            done();
        });    
    });
    
    let item = {
        "name": "Apple",
        "quantity": 10,
        "discountPercentage": 5,
        "category": "Food",
        "price": 55
    };
    let itemInvalid = {
        "name": "Apple",
        "quantity": 10,
        "discountPercentage": 5,
        "price": 55
    };

    it("should create user", function (done) {
        request(app)
            .post("/api/auth/user")
            .set("Accept","application/json")
            .send({"username": "test", "password": "test"})
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function () {
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

    describe("Get Items API", function() { 

        it("should send Unauthorized status", function(done) { 
            let req = request(app).get("/api/items");
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

   
        it("should get all items", function(done) { 
            let req = request(app).get("/api/items");
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                done(); 
            }); 
        }); 

        it("should specific all items", function(done) { 
            let req = request(app).get("/api/items?name=apple");
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                done(); 
            }); 
        }); 
    });

    describe("Create item API ", function() { 
        it("should create a item", function(done) { 
            let req = request(app).post("/api/items");
            req.cookies = Cookies;
            req.send(item).end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                expect(res.body.name).to.equal(item.name); 
                done(); 
            }); 
        }); 
    }); 

    it("should send Unauthorized status", function(done) { 
        let req = request(app).post("/api/items");
        req.send(item).end(function(err, res) { 
            expect(res.statusCode).to.equal(401); 
            done(); 
        }); 
    }); 

    it("should send bad request status", function(done) { 
        let req = request(app).post("/api/items");
        req.cookies = Cookies;
        req.send(itemInvalid).end(function(err, res) { 
            expect(res.statusCode).to.equal(400); 
            done(); 
        }); 
    }); 
});
