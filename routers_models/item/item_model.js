  
const db = require("../../data/dbConfig");

const User = require("../users/users_model");

module.exports = {
    addItem, 
    findAllItems,
    findBy,
    findItemById, 
    updateItem,
    deleteItem,
    findItemCategories,
    searchItem, 
};

function findAllItems() {
    return db("item").join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.city", "item.country", "item.price", "item.user_id", "user.username");
}

function findItemById(id) {
    return db("item")
        .where("item.id", id)
        .first()
        .join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.city", "item.country", "item.price", "item.user_id", "user.username");
}

function findBy(filter) {
    return db("item").where(filter);
}

function searchItem(value) {
    return db("item").where(db.raw('LOWER("name")'), "like", `%${value.toLowerCase()}%`)
        .join("user", "item.user_id", "user.id")
        .select("item.id", "item.name", "item.description", "item.city", "item.country", "item.price", "item.user_id", "user.username");
}

async function addItem(item) {
    const [id] = await db("item").insert(item, "id");

    return findItemById(id);
}

async function updateItem(id, changes) {
    await db("item")
        .where({ id })
        .update(changes)

    const item = await findItemById(id)

    return User.findItemByUserId(item.user_id);
}

function deleteItem(id) {
    return db("item")
        .where({ id })
        .del();
}

function findItemCategories(id) {
    return db("category").where({ "item_id": id });
}
