const router = require("express").Router();
const User = require("../models/User");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const RefreshToken = require("../models/RefreshToken");

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

    console.log(results);

    res.json(results);
  } catch (error) {
    console.log(error.errors[0].message);
    console.log(error);
    res.status(500).send(error.errors[0].message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  console.log(req.headers);
  try {
    // Grab user from DB and validate
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

    // Sign the new tokens for the now verified user
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "15s",
    });

    var token_refresh = jwt.sign({ id: user.id }, config.refresh_secret, {
      expiresIn: "30s",
    });

    // Put the refresh token in the DB
    try {
      const [results, meta] = await sequelize.query(
        "INSERT INTO refreshtokens (tokenvalue) VALUES($1) RETURNING *",
        { bind: [token_refresh], type: QueryTypes.INSERT }
      );
    } catch (error) {
      console.error(error.message);
    }

    // Set cookies
    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshToken", token_refresh, { httpOnly: true });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
      refreshToken: token_refresh,
    });
  } catch (error) {
    console.error(error.message);
  }
});

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) return res.sendStatus(401);

  // Check DB to see if refresh token exists
  try {
    const tokenFromDB = await RefreshToken.findOne({
      where: { tokenValue: refreshToken },
    });

    if (!tokenFromDB) return res.sendStatus(403);
  } catch (error) {
    console.log(error);
  }

  // Verify token with secret
  jwt.verify(refreshToken, config.refresh_secret, async (error, user) => {
    if (error) {
      // If there is an error, token is no longer valid, delete it from DB and return
      try {
        const [results, meta] = await sequelize.query(
          "DELETE FROM refreshtokens WHERE (tokenvalue)=$1 RETURNING *",
          { bind: [refreshToken], type: QueryTypes.INSERT }
        );
      } catch (error) {
        console.error(error.message);
      }
      return res.sendStatus(403);
    }
    //otherwise let's sign the new access token for the user
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: "15s",
    });
    // Set cookie
    res.cookie("token", token, { httpOnly: true });
    res.json({ accessToken: token });
  });
});

router.get("/logout", async (req, res) => {
  try {
    //delete the refresh token from the DB
    try {
      const [results, meta] = await sequelize.query(
        "DELETE FROM refreshtokens WHERE (tokenvalue)=$1 RETURNING *",
        { bind: [req.cookies.refreshToken], type: QueryTypes.INSERT }
      );
    } catch (error) {
      console.error(error.message);
    }
    //clear all user cookies
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).send("User logged out");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
