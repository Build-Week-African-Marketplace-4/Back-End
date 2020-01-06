const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validate = require('./middleware/helpers')

const User = require('../routers_models/users/users_model')



// @apiParamExample {json} Example Body
// {
// 	"username": "mike1",
// 	"password": "pass",
// 	"email": "mike@aol.com"
// }
//@apiSuccessExample {json} Successful Response
// {
//   "newUser": {
//       "id": 6,
//       "username": "mike12",
//       "first_name": null,
//       "last_name": null,
//       "email": "mike2@aol.com"
//   },
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtaWtlMTIiLCJpYXQiOjE1NzgyODI5NTQsImV4cCI6MTU3ODcxNDk1NH0.47jI3AJvLHAOYCQjVmQQ_xKgeuexhsWvLfy35zsmPGg"
// }

router.post('/register', validate, (req, res) => {
  let newReg = req.body
  const hash = bcrypt.hashSync(newReg.password, 12)
  newReg.password = hash
  User.addUser(newReg)
    .then(newUser => {
      const token = getToken(newUser)
      delete newUser.password
      res.status(201).json({newUser, token})
    })
    .catch(error => {
      res.status(500).json({error, message:`register did not work try again`})
    })
})

router.post('/login', validate, (req, res) => {
  const  { username, password } = req.body

  User.findBy({ username })
  .first()
  .then(login => {
    if (login && bcrypt.compareSync(password, login.password)) {
      const token = getToken(login)
      delete login.password;
      res.status(200).json({login, token})
    }else{
      res.status(401).json({message: `username or password incorrect`})
    }
  }) 
  .catch(error => {
    res.status(500).json (error)
  })
})


//Generate Token = getToken
function getToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      // department: user.department
    };
    const secret = process.env.JWT_SECRET || "thiS Is vErY eAsy tO Break";
  
    const options = {
      expiresIn: "5d"
    };
    return jwt.sign(payload, secret, options);
  }
  
  module.exports = router;