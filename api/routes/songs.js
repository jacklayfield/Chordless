const router = require("express").Router();
const Song = require("../models/Song");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");

router.get("/", function (request, response) {
  Song.findAll().then((songs) => {
    response.json(songs);
  });
});

router.post("/create", async (req, res) => {
  try {
    const { name } = req.body;
    const [results, meta] = await sequelize.query(
      "INSERT INTO songs (name) VALUES($1) RETURNING *",
      { bind: [name], type: QueryTypes.INSERT }
    );

    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
