/* eslint-disable no-console */
/* eslint-disable no-undef */
let app = require("../../server");
let chai = require("chai");
let request = require("supertest");
let should =  require("chai").should();
let Cookies;
let orderId;
let expect = chai.expect;
describe("orders API", function() { 
    let order = {
        "createdDate": "2019-02-05 06:02:56.605",
        "items": [
            {
                "itemId": "5c48575af0c54979d14846c7",
                "name": "Apple",
                "quantity": 10,
                "discountPercentage": 5,
                "category": "Food",
                "price": 55
            }
        ],
        "openStatus": true,
        "discountPercentage": 10,
        "userId": ""
    };

    let orderInvalid = {
        "createdDate": "2019-02-05 06:02:56.605",
        "items": [
            {
                "itemId": "5c48575af0c54979d14846c7",
                "name": "Apple",
                "quantity": 10,
                "discountPercentage": 5,
                "category": "Food",
                "price": 55
            }
        ],
        "openStatus": true,
        "userId": ""
    };

    it("should create user session for valid user", function (done) {
        request(app)
            .post("/api/auth/login")
            .set("Accept","application/json")
            .send({"username": "test", "password": "test"})
            .expect("Content-Type", /json/)
            .expect(200)
            .end(function (err, res) {
                order.userId = res.body._id;
                should.exist(res.body._id);
                Cookies = res.headers["set-cookie"].pop().split(";")[0];
                done();
            });
    });

    describe("Create order API ", function() { 

        it("should create a order", function(done) { 
            let req = request(app).post("/api/orders");
            req.cookies = Cookies;
            req.send(order).end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                expect(res.body.userId).to.equal(order.userId); 
                orderId = order.userId;
                done(); 
            }); 
        }); 
    }); 

    it("should send Unauthorized status", function(done) { 
        let req = request(app).post("/api/orders");
        req.send(order).end(function(err, res) { 
            expect(res.statusCode).to.equal(401); 
            done(); 
        }); 
    }); 

    it("should send bad request status", function(done) { 
        let req = request(app).post("/api/orders");
        req.cookies = Cookies;
        req.send(orderInvalid).end(function(err, res) { 
            expect(res.statusCode).to.equal(400); 
            done(); 
        }); 
    }); 


    describe("Get Orders API", function() { 

        it("should send Unauthorized status", function(done) { 
            let req = request(app).get("/api/orders");
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

   
        it("should get all orders", function(done) { 
            let req = request(app).get("/api/orders");
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                done(); 
            }); 
        }); 
    });


    describe("Get Orders API", function() { 

        it("should send Unauthorized status", function(done) { 
            let req = request(app).get(`/api/orders/${orderId}`);
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

   
        it("should send bad request status for unknown orderId", function(done) { 
            let req = request(app).get("/api/orders/afsdf");
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should get order", function(done) { 
            let req = request(app).get(`/api/orders/${orderId}`);
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                done(); 
            }); 
        }); 
    });

});
