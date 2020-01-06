const db = require("../../data/dbConfig");

module.exports = {
    addFavorite,
    findBy,
    getFavoriteById,
    deleteFavorite,
    getUsersFavorites,
    getFavoritesCount
};


function getFavoriteById(id) {
    return db("user_item")
        .where({ id })
        .first();
}

function findBy(filter) {
    return db("user_item").where(filter);
}

async function addFavorite(user_id, item_id) {
    await db("user_item").insert({ user_id, item_id })

    return getUsersFavorites(user_id);
}


function deleteFavorite(user_id, item_id) {
    return db("user_item")
        .where({ user_id, item_id })
        .del();
}

async function getUsersFavorites(user_id) {
    const favorites = await db("user_item").where("user_item.user_id", user_id)
        .join("item", "user_item.item_id", "item.id")
        .join("user", "item.user_id", "user.id")
        .select("user_item.item_id", "user_item.user_id", "item.name", "item.description", "item.city", "item.country", "item.price", "user.email", "user.username");

    return Promise.all(favorites.map(async item => {
        const favorited = await getFavoritesCount(item.item_id)
        item.favorited = favorited.count;
        return item;
    })).then(() => {
        return favorites;
    }).catch(err => {
        return { err }
    })
}

async function getFavoritesCount(item_id) {
    return db("user_item").where("item_id", "=", item_id).count("item_id as count").first();
}