const router = require("express").Router();

const User_item = require('../user_item/user_item_model') 
const Item = require("./item_model");
const restricted = require("../../auth/middleware/restricted_middleware");
const validateItemId = require('../../auth/middleware/validItemId')

// /api/items 

router.get("/", async (req, res) => {
    try {
        const items = await Item.findAllItems();

        Promise.all(items.map(async item => {
            const categories = await Item.findItemCategories(item.id);
            item.categories = categories;
            return item;
        })).then(items => {
            res.status(200).json(items);
        })

    } catch (error) {
        res.status(500).json({ error });
    }
});

//  GET Item By Id /api/items/:id 

router.get("/:id", validateItemId, async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findItemById(id);
        const favorited = await User_item.getFavoritesCount(id);
        item.favorited = favorited.count;
        item.categories = await Items.findItemCategories(id);
        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ error });
    }
});


//GET Search for an Item by Like Name /api/items/search/:name 

router.get("/search/:name", (req, res) => {
    const name = req.params.name;
    Item.searchItem(name)
        .then(items => {
            res.status(200).json(items)
        })
        .catch(err => {
            res.status(500).json({ err })
        });
})

// Post New Item /api/items

router.post("/", restricted, (req, res) => {
    req.body.country = req.body.country.toUpperCase();

    Item.addItem(req.body)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

//PUT New Item by ID /api/items 

router.put("/:id", restricted, validateItemId, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    // if (req.body.country) return req.body.country = req.body.country.toUpperCase();

    Item.updateItem(id, changes)
        .then(updatedItem => {
            res.status(201).json(updatedItem);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

//DELETE New Item by ID /api/items 
router.delete("/:id", restricted, validateItemId, (req, res) => {
    const id = req.params.id;

    Item.deleteItem(id)
        .then(deletedItem => {
            res.status(200).json({ message: "Item successfully deleted from database." });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

module.exports = router;