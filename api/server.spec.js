const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


describe('Test the addLike method', () => {
    beforeAll(() => {
        knex.connect();
    });
    afterAll((done) => {
        knex.disconnect(done);
    });
})


  
describe ("server.js", () => {
    describe("environment", () => {
        it("should set environment to testing", () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })
    describe('GET /', () => {
        it ('should return a 200 ok', () => {
           return request(server).get('/').then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a TEXT', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/text/i);
                })
        })
    })
})
// describe('server', () => {
//     describe('POST /register', () => {
//         it('should return 200 OK', () => {
//             return request(server).post('/api/auth/register').send({username:"aaa",password:"aaa"})
//             .then(res => {
//                 expect(res.status).toBe(201);
//             })
//         })
//         it('should return JSON data', () => {
//             return request(server).post('/api/auth/register').send({username:"bob",password:"bob"}).then(res => {
//                 expect(res.type).toMatch(/json/i);
//             })
//         })
//     })
//     describe('POST /login', () => {
//         it('should return 200 OK', () => {
//             return request(server).post('/api/auth/login').send({username:"bob",password:"bob"}).then(res => {
//                 expect(res.status).toBe(200);
//             })
//         })
//         it('should return JSON data', () => {
//             return request(server).post('/api/auth/login').send({username:"bob",password:"bob"}).then(res => {
//                 expect(res.type).toMatch(/json/i);
//             })
//         })
//     })  
//})