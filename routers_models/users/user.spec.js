const db = require("../../data/dbConfig");

const User = require("./users_model");

describe("users model", () => {
    afterEach(async () => {
        // this function executes and clears out the table before each test
        await db('user').truncate();
    });
    describe("addUser()", () => {

        it("should insert a new user into the database", async () => {
            await User.addUser({ username: "carlos", password: "practice" })
            await User.addUser({ username: "sam", password: "practice" })

            const users = await db("user");

            expect(users).toHaveLength(2)
        })
    })
    describe("findUserById(id)", () => {
        it("should get all users in the database", async () => {
            await User.addUser({ username: "carlos", password: "practice" })
            const user = await User.findUserById(1);

            expect(user.username).toBe("carlos")
        })
    })

    describe("deleteUser()", () => {
        it("should delete user", async () => {
            await User.addUser({ username: "carlos", password: "practice" })
            await User.addUser({ username: "sam", password: "practice" })
            await User.deleteUser(1)
            const user = await User.findUserById(1);

            expect(user).toBe(undefined)
        })
    })
})