var jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    next();
  });
};

module.exports = verifyJWT;
