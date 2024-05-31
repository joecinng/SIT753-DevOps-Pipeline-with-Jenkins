var request = require("request");
var expect = require('chai').expect;
const { CatModel } = require('./Models/catModel');
const jenkinsURL = process.env.JENKINS_URL || "http://localhost:8080";
const url = jenkinsURL + "/api/cats";

describe("Get api/cats", function() 
{
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.be.equal(200);
            done()
        });
    });

    it("Returns the message as the result", function(done) {
        request(url, function(error, response, body) {
            // parse the json body string to an object to retrieve message and status code
            body = JSON.parse(body);
            expect(body.message).to.be.equal("get all cards success");
            done()
        });
    });
});

describe("Post api/cats", function() 
{
    var newCat = new CatModel("Kitten test", "brown", "http://cat.jpg", "A test kitten");

    it("returns status 201 to check if api works", function(done) {
        request.post({url: url, json: newCat}, function(error, response, body) {
            expect(response.statusCode).to.be.equal(201);
            done()
        });
    });

    it("Adds a new cat", function(done) {
        request.post({url: url, json: newCat}, function(error, response, body) {
            expect(body.message).to.be.equal("Cat created successfully");
            done()
        });
    });
});