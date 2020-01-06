const Users = require('../../routers_models/users/users_model')

function validateId(req, res, next) {
    const id = req.params.id;

    Users.findUserById(id)
        .then(item => {
            if (item) {
                req.item = item;
                next();
            } else {
                res.status(404).json({ message: "User Not Found." });
            }
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}

module.exports = validateId