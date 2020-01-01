const router =  require('express').Router();



const User = require('./users_model')



router.get("/", (req, res) => {
    User.findAllUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});