function validate(req, res, next) {
    if (!req.body.email || !req.body.password) {
        res
            .status(400)
            .json({ message: "Email & password fields are required." });
    } else {
        next();
    }
}

module.exports = validate