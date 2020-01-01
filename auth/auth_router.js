const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validate = require('./helpers')

const User = require('../users/users_model')

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
      res.status(201).json({login, token})
    }else{
      res.status(401).json({message: `username or password incorrect`})
    }
  }) 
  .catch(error => {
    res.status(500).json (error)
  })
})


function getToken(user) {
    const payload = {
      id: user.id,
      username: user.username,
      department: user.department
    };
    const secret = process.env.JWT_SECRET || "thiS Is vErY eAsy tO Break";
  
    const options = {
      expiresIn: "5d"
    };
    return jwt.sign(payload, secret, options);
  }
  
  module.exports = router;