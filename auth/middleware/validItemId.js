const Item = require('../../routers_models/item/item_model')

function validateItemId(req, res, next) {
    const id = req.params.id;

    Item.findItemById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "Item Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}

module.exports = validateItemId