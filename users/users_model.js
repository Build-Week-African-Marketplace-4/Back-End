const db = require('../data/dbConfig')

module.exports = {
    addUser,
    findAllUser,
    findBy,
    findUserById,
    updateData,
    deleteUser,
    findItemByUserId
}

function findAllUser() {
    return db('user')
}

function findBy(filter) {
    return db('user').where(filter)
}

function findUserById(id) {
    return db('user')
        .where({ id })
        .first()
}
async function addUser(user) {
    const [id] = await db('user').insert(user, 'id')
    return findUserById(id)
}

async function updateData(id, changes) {
    await db('user')
    .where({ id })
    .update(changes)
    return findUserById(id)
}

function deleteUser(id) {
    return db('user')
    .where({ id })
    .del()
}

function findItemByUserId(id) {
    return db('item')
    .where({ 'user_id': id })

}