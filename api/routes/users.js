const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/userdata", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.SECRET).id;

    const user = await User.findOne({
      where: { id: userId },
    });

    const id = user.id;
    const email = user.email;
    const username = user.username;
    const name = user.name;
    const bio = user.bio;
    const preferences = user.preferences;
    parsedUser = { id, username, email, name, bio, preferences };

    res.json(parsedUser);
  } catch (error) {
    res.status(403).send(error);
  }
});

router.put("/updateBio", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.SECRET).id;

    const user = await User.findOne({
      where: { id: userId },
    });

    const bio = req.body.data.bio;

    const [results, meta] = await sequelize.query(
      "UPDATE users SET bio = ($1) WHERE id = ($2) RETURNING *",
      { bind: [bio, user.id], type: QueryTypes.UPDATE }
    );

    res.status(200).send();
  } catch (error) {
    res.status(403).send(error);
  }
});

router.put("/updateName", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, process.env.SECRET).id;

    const user = await User.findOne({
      where: { id: userId },
    });

    const name = req.body.data.name;

    const [results, meta] = await sequelize.query(
      "UPDATE users SET name = ($1) WHERE id = ($2) RETURNING *",
      { bind: [name, user.id], type: QueryTypes.UPDATE }
    );

    res.status(200).send();
  } catch (error) {
    res.status(403).send(error);
  }
});

module.exports = router;
