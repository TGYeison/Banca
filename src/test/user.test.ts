import app from  "../app";
const supertest = require("supertest");

const api = supertest(app);

describe("Create a new user", () => {
    test("creating a new user success", async() => {
        const newUser = {
            "name": "Giovany",
            "lastName": "Basto",
            "userName": `GBasto${Math.round(Math.random() * 1000)}`,
            "password": "1q2w3e$R",
            "docID": "4934342",
            "phone": "3152233408"
        };

        await api.post('/user/register')
                .send(newUser)
                .expect(201);
    
    })
})