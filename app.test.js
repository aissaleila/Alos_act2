const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");


const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
 it("welcomes user to the api", done => {
chai
 .request(app)
.get("/db")
end((err, res) => {
expect(res).to.have.status(200);
expect(res.body.status).to.equals("success");
expect(res.body.message).to.equals("Welcome To Testing API");
 done();
});
});


 it("add University", done => {
chai
.request(app)
.post("/db")
 .send({ id: 100, web_pages:  "http://www.test.url/", name: "test" , alpha_two_code: "TS", domains :  "http://TEST.hu/" ,country: "testContry" })
.end((err, res) => {
expect(res).to.have.status(200);
expect(res.body.status).to.equals("success");
expect(res.body.result).to.equals(
    [{
        "id": 100,
        "web_pages": [
          "http://www.test.url/"
        ],
        "name": "test",
        "alpha_two_code": "TS",
        "domains": [
          "http://TEST.hu/"
        ],
        "country": "testContry"
      }]
);
 done();
 });
 });
});