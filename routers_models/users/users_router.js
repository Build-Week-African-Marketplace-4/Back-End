const router =  require('express').Router();

const validateID = require('../../auth/middleware/validId')

const User_item = require('../user_item/user_item_model')
const User = require('./users_model')
const Item = require('../item/item_model')


//@apiSuccessExample {json} Successful Response
// [
//     {
//         "id": 1,
//         "password": "$2a$12$PGWFwIfpxWqd18nGoNJwf.VKNvkPzqjU/aPcRo1pde.8CJfGhEjYa",
//         "username": "adaeze",
//         "first_name": "Adaeze",
//         "last_name": "Abiodun",
//         "email": "adaeze@gmail.com"
//     },
//     {
//         "id": 2,
//         "password": "$2a$12$zsYKJmifHyEtuFP12ge6OuK5fhcuSWiNoErXSajqpVgsZA/SrX62m",
//         "username": "abidemi",
//         "first_name": "Abidemi",
//         "last_name": "Achebe",
//         "email": "abidemi@gmail.com"
//     },
//     {
//         "id": 3,
//         "password": "$2a$12$WGNImg1mPmgozt/3EHaZnuMDdKweL4NSYp1U60cNMftSwFD3D9HfC",
//         "username": "abebi",
//         "first_name": "Abedi",
//         "last_name": "Abimbola",
//         "email": "abebi@gmail.com"
//     },
//     {
//         "id": 4,
//         "password": "$2a$12$.0I//DGLMFFRN3FwA0CQkuRjRw3B4mrczXV463FIacmp66wpJ0Imy",
//         "username": "test",
//         "first_name": "testfirst",
//         "last_name": "testlast",
//         "email": "test@gmail.com"
//     }
// ]

router.get("/", (req, res) => {
    User.findAllUser()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});

router.get("/:id", validateID, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findUserById(id);
        user.items = await User.findItemByUserId(id);
        user.favorites = await User_item.getUsersFavorites(id);
        delete user.password;
        Promise.all(user.items.map(async item => {
            const categories = await Item.findItemCategories(item.id);
            const favorited = await User_item.getFavoritesCount(item.id)
            item.favorited = favorited.count;
            item.categories = categories;
            return item;
        }))
            .then(items => {
                res.status(200).json({ user });
            })
    } catch (error) {
        res.status(500).json({ error, message: `did not find user` });
    }
});

router.put("/:id", validateID, (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Users.updateData(id, changes)
        .then(updatedUser => {
            delete updatedUser.password;
            res.status(201).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ err });
        });
}
);

router.delete("/:id", validateID, (req, res) => {
    const id = req.params.id;

    Users.deleteUser(id)
        .then(deletedUser => {
            res.status(200).json({ deletedUser, message: "User successfully deleted." });
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});


module.exports = router





