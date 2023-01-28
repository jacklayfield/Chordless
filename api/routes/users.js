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
    // console.log(req.cookies.token);
    // console.log("TOKEN FROM HTTP HEADER: " + req.headers);
    // console.log(req.headers);
    // console.log(req.params.id);
    const decoded = jwt.verify(req.cookies.token, config.secret);
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
