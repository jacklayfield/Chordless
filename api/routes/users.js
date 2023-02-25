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

    const id = user.id;
    const email = user.email;
    const username = user.username;
    const name = user.name;
    const bio = user.bio;
    parsedUser = { id, username, email, name, bio };

    res.json(parsedUser);
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
  }
});

router.put("/updateBio", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    user_id = decoded.id;

    const user = await User.findOne({
      where: { id: user_id },
    });

    const bio = req.body.data.bio;

    console.log("hello" + bio);

    try {
      const [results, meta] = await sequelize.query(
        "UPDATE users SET bio = ($1) WHERE id = ($2) RETURNING *",
        { bind: [bio, user.id], type: QueryTypes.UPDATE }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error);
    }
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
  }
});

router.put("/updateName", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    user_id = decoded.id;

    const user = await User.findOne({
      where: { id: user_id },
    });

    const name = req.body.data.name;

    console.log("hello" + name);

    try {
      const [results, meta] = await sequelize.query(
        "UPDATE users SET name = ($1) WHERE id = ($2) RETURNING *",
        { bind: [name, user.id], type: QueryTypes.UPDATE }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error);
    }
  } catch (error) {
    console.error(error);
    res.status(403).send(error);
  }
});
