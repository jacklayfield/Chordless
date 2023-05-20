const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const verifyJWT = require("../middleware/verifyJWT");

module.exports = router;

router.use(verifyJWT);

router.get("/userdata", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;

    const user = await User.findOne({
      where: { id: userId },
    });

    const id = user.id;
    const email = user.email;
    const username = user.username;
    const name = user.name;
    const bio = user.bio;
    parsedUser = { id, username, email, name, bio };

    res.json(parsedUser);
  } catch (error) {
    res.status(403).send(error);
  }
});

router.put("/updateBio", async (req, res) => {
  try {
    const user_id = req.body.data.user_id;

    const user = await User.findOne({
      where: { id: user_id },
    });

    const bio = req.body.data.bio;

    const [results, meta] = await sequelize.query(
      "UPDATE users SET bio = ($1) WHERE id = ($2) RETURNING *",
      { bind: [bio, user.id], type: QueryTypes.UPDATE }
    );
  } catch (error) {
    res.status(403).send(error);
  }
});

router.put("/updateName", async (req, res) => {
  try {
    const user_id = req.body.data.user_id;

    const user = await User.findOne({
      where: { id: user_id },
    });

    const name = req.body.data.name;

    const [results, meta] = await sequelize.query(
      "UPDATE users SET name = ($1) WHERE id = ($2) RETURNING *",
      { bind: [name, user.id], type: QueryTypes.UPDATE }
    );
  } catch (error) {
    res.status(403).send(error);
  }
});
