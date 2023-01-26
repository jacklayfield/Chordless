const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = router;

router.get("/id=:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const decoded = jwt.verify(req.params.id, config.secret);
    user_id = decoded.id;

    const user = await User.findOne({
      where: { id: user_id },
    });

    const email = user.email;
    const username = user.username;
    parsedUser = { username, email };

    res.json(parsedUser);
  } catch (err) {
    res.json(err);
  }
});
