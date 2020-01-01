function validate(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res
            .status(400)
            .json({ message: "username & password fields are required." });
    } else {
        next();
    }
}

module.exports = validate