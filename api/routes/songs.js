const router = require("express").Router();
const Song = require("../models/Song");
const Chord = require("../models/Chord");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

router.get("/", function (request, response) {
  Song.findAll().then((songs) => {
    response.json(songs);
  });
});

router.post("/create", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    const user_id = decoded.id;

    const name = req.body.data.songName;
    const chords = req.body.data.chords;

    const [results, meta] = await sequelize.query(
      "INSERT INTO songs (userId, name) VALUES($1, $2) RETURNING *",
      { bind: [user_id, name], type: QueryTypes.INSERT }
    );

    const statements = [];
    const tableName = "chords";

    chords.forEach((chord, i) => {
      statements.push(
        sequelize.query(
          `INSERT INTO ${tableName}(songId, chordIndex, chordNotes, chordName) VALUES(${results[0].id}, ${i}, '{${chord.chordArr}}', '${chord.chordName}') RETURNING *`
        )
      );
    });
    const results1 = await Promise.all(statements);

    console.log(results1);

    res.json(results);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/userSongs", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    const user_id = decoded.id;

    // Fetch songs based on user id
    const songs = await Song.findAll({
      where: { userid: user_id },
    });
    res.json(songs);
    // This will only fetch from the song table, returning name, id , etc. (for song cards)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/singleSong/id=:id", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    const user_id = decoded.id;

    const songId = req.params.id;

    const song = await Song.findOne({
      where: { id: songId },
    });

    if (song == null) {
      return res.status(404).send("Song was not found");
    }

    if (song.dataValues.userId != user_id) {
      return res.status(403).send("user not permitted to view song");
    }
    res.json(song);
    // Fetch a single song based on song id
    // This will fetch from the chord table, returning a list of elements containing chord name, and note array (for single song view)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/allChords/id=:id", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    const user_id = decoded.id;

    const songId = req.params.id;

    const chords = await Chord.findAll({
      where: { songid: songId },
      order: [["chordindex", "ASC"]],
    });

    res.json(chords);
    // Fetch a single song based on song id
    // This will fetch from the chord table, returning a list of elements containing chord name, and note array (for single song view)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deleteSong/id=:id", async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.token, config.secret);
    const user_id = decoded.id;

    const songId = req.params.id;

    const song = await Song.findOne({
      where: { id: songId },
    });

    if (song.dataValues.userId != user_id) {
      return res
        .status(403)
        .send("attempt to delete a song that you don't own has been denied");
    }

    const song1 = await Song.destroy({
      where: { id: songId },
    });
    const song2 = await Chord.destroy({
      where: { songid: songId },
    });

    res.status(200).send();

    // Fetch a single song based on song id
    // This will fetch from the chord table, returning a list of elements containing chord name, and note array (for single song view)
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
