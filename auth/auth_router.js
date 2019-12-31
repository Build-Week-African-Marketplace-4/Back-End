const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");







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