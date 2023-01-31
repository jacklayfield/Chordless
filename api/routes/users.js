const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = router;

router.get("/userdata", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    user_id = decoded.id;

    const user = await User.findOne({
      where: { id: user_id },
    });

    const email = user.email;
    const username = user.username;
    parsedUser = { username, email };

    res.json(parsedUser);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
  }
});
