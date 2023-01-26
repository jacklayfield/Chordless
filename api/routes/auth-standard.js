const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

// CREATE USER
router.post("/create", async (req, res) => {
  try {
    console.log(req.body.data.password);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.data.password, salt);
    const username = req.body.data.username;
    const email = req.body.data.email;
    const [results, meta] = await sequelize.query(
      "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *",
      { bind: [username, email, hashedPass], type: QueryTypes.INSERT }
    );

    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log(req.headers);
  try {
    const user = await User.findOne({
      where: { username: req.body.data.username },
    });

    if (!user) {
      console.log("failed to find user");
      return res.status(400).json("Wrong credentials!");
    }

    const validated = await bcrypt.compare(
      req.body.data.password,
      user.password
    );

    if (!validated) {
      console.log("failed to verify password");
      return res.status(400).json("Wrong credentials!");
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
