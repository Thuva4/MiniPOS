/* eslint-disable no-console */
/* eslint-disable no-undef */
let app = require("../../server");
let chai = require("chai");
let request = require("supertest");
let should =  require("chai").should();
let Cookies;
let orderId;
let itemId;
var expect = chai.expect;
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


    let orderedItem = {
        "itemId": "5c48575af0c54979d14846c5",
        "name": "Apple",
        "quantity": 10,
        "discountPercentage": 5,
        "category": "Food",
        "price": 55
    };

    let orderedItemInvalid = {
        ...order,
        "category": "random"
        
    };

    let updateOrderQuantity = {
        quantity: 10
    };

    let orderedItemInvalidName = {
        "itemId": "5c48575af0c54979d14846c5",
        "quantity": 10,
        "discountPercentage": 5,
        "category": "Food",
        "price": 55
        
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

    it("should create a order", function(done) { 
        let req = request(app).post("/api/orders");
        req.cookies = Cookies;
        req.send(order).end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            orderId = res.body._id;
            done(); 
        }); 
    }); 

    describe("Get Items of a order API", function() { 

        it("should send Unauthorized status", function(done) { 
            let req = request(app).get(`/api/order/${orderId}/items`);
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

   
        it("should get all Items", function(done) { 
            let req = request(app).get(`/api/order/${orderId}/items`);
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                done(); 
            }); 
        }); 
    });

    describe("Create Items of a order API", function() { 


        it("should send Unauthorized status", function(done) { 
            let req = request(app).post(`/api/order/${orderId}/items`);
            req.send(orderedItem).end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

        it("should send bad request status for unknown orderId", function(done) { 
            let req = request(app).post("/api/order/dfkjdshf/items");
            req.cookies = Cookies;
            req.send(orderedItem).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should send bad request status for empty body", function(done) { 
            let req = request(app).post(`/api/order/${orderId}/items`);
            req.cookies = Cookies;
            req.send({}).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should send bad request status for emty name", function(done) { 
            let req = request(app).post(`/api/order/${orderId}/items`);
            req.cookies = Cookies;
            req.send(orderedItemInvalidName).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("Create order item", function(done) { 
            let req = request(app).post(`/api/order/${orderId}/items`);
            req.cookies = Cookies;
            req.send(orderedItem).end(function(err, res) { 
                expect(res.statusCode).to.equal(200);  
                itemId = res.body.items[0].itemId;
                done(); 
            }); 
        }); 

        it("should send bad request if item exist", function(done) { 
            let req = request(app).post(`/api/order/${orderId}/items`);
            req.cookies = Cookies;
            req.send(orderedItem).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should send bad request for unknown item category", function(done) { 
            let req = request(app).post(`/api/order/${orderId}/items`);
            req.cookies = Cookies;
            req.send(orderedItemInvalid).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 
    });

    describe("Update Items of a order API", function() { 


        it("should send Unauthorized status", function(done) { 
            let req = request(app).put(`/api/order/${orderId}/items/${itemId}`);
            req.send(updateOrderQuantity).end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

        it("should send bad request status for unknown orderId", function(done) { 
            let req = request(app).put(`/api/order/dfkjdshf/items/${itemId}`);
            req.cookies = Cookies;
            req.send(updateOrderQuantity).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should send bad request status for unknown itemId", function(done) { 
            let req = request(app).put(`/api/order/${orderId}/items/afdafaf`);
            req.cookies = Cookies;
            req.send(orderedItem).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should send bad request status for empty body", function(done) { 
            let req = request(app).put(`/api/order/${orderId}/items/${itemId}`);
            req.cookies = Cookies;
            req.send({}).end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should update the quantity", function(done) { 
            let req = request(app).put(`/api/order/${orderId}/items/${itemId}`);
            req.cookies = Cookies;
            req.send(updateOrderQuantity).end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 

                done(); 
            }); 
        }); 
    });


    describe("Delete Items of a order API", function() { 


        it("should send Unauthorized status", function(done) { 
            let req = request(app).delete(`/api/order/${orderId}/items/${itemId}`);
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(401); 
                done(); 
            }); 
        }); 

        it("should send bad request status for unknown orderId", function(done) { 
            let req = request(app).delete(`/api/order/dfkjdshf/items/${itemId}`);
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should send bad request status for unknown itemId", function(done) { 
            let req = request(app).delete(`/api/order/${orderId}/items/afdafaf`);
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(400); 
                done(); 
            }); 
        }); 

        it("should delete the order item", function(done) { 
            let req = request(app).delete(`/api/order/${orderId}/items/${itemId}`);
            req.cookies = Cookies;
            req.end(function(err, res) { 
                expect(res.statusCode).to.equal(200); 
                done(); 
            }); 
        }); 
    });
});
