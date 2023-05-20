var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const verifyJWT = (req, res, next) => {
  jwt.verify(req.cookies.token, config.secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    next();
  });
};

module.exports = verifyJWT;
