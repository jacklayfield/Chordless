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
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/userSongs", async (req, res) => {
  try {
    const userId = req.body.data.userId;

    // Fetch songs based on user id
    // This will only fetch from the song table, returning name, id , etc. (for song cards)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/singleSong", async (req, res) => {
  try {
    const songId = req.body.data.songId;

    // Fetch a single song based on song id
    // This will fetch from the chord table, returning a list of elements containing chord name, and note array (for single song view)
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
