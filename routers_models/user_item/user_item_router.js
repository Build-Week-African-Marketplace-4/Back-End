const router = require("express").Router();

const User_item = require("./user_item_model");



router.get("/:id", (req, res) => {
    const user_id = req.params.id;
    User_item.getUsersFavorites(user_id)
        .then(favorites => {
            res.status(200).json(favorites)
        })
        .catch(err => {
            res.status(500).json({ err })
        })

})

router.post("/:id", (req, res) => {
    const user_id = req.params.id;
    const item_id = req.body.item_id;

    User_item.addFavorite(user_id, item_id)
        .then(favorites => {
            res.status(200).json({ favorites })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

router.delete("/:id", (req, res) => {
    const user_id = req.params.id;
    const item_id = req.body.item_id;

    User_item.deleteFavorite(user_id, item_id)
        .then(favorite => {
            res.status(200).json({ message: "Favorite successfully deleted." })
        })
        .catch(err => {
            res.status(500).json({ err })
        })
})

module.exports = router;