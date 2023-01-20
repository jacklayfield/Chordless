const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");

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

// LOGIN (NEED TO IMPLEMENT)
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
