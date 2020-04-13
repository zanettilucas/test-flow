const request = require("supertest");
const api = require("../api");
const repository = require("../repository/requestRepository")

test("Pruebo que me devuelva 200 el status.", (done) => {
    request(api)
        .get("/status")
        .expect("Content-Type", /json/)
        .then((response) => {
            expect(response.status).toBe(200)
            done()
        });
});

// jest.mock("../repository/requestRepository")
// test("Pruebo que me devuelva 200 el location.", (done) => {
//     request(api)
//         .get("/v1/location").set('X-Forwarded-For', '8.8.8.8')
//         .expect("Content-Type", /json/)
//         .then((response) => {
//             console.log(response)
//             expect(response.status).toBe(200)
//             done()
//         });
// });
