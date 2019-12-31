const jwt = require("jsonwebtoken"); // installed this


module.exports = (req, res, next) => {
  const  { authorization }  = req.headers;
console.log(authorization)


  if (authorization) {
    const secret = process.env.JWT_SECRET || "thiS Is vErY eAsy tO Break";

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "Invalid Token from middleware" });
      } else {
        req.token = decodedToken;
        console.log(req.token)
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Please login and try again" });
  }
};

