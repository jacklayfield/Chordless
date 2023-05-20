const router = require("express").Router();
const Song = require("../models/Song");
const Chord = require("../models/Chord");
const sequelize = require("./../database/sequelize");
const { QueryTypes } = require("sequelize");
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const verifyJWT = require("../middleware/verifyJWT");

const NOTFOUND = 1;
const FORBIDDEN = 2;

router.use(verifyJWT);

router.get("/", function (request, response) {
  Song.findAll().then((songs) => {
    response.json(songs);
  });
});

router.post("/create", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const name = req.body.data.songName;
    const chords = req.body.data.chords;

    const [results, meta] = await sequelize.query(
      "INSERT INTO songs (userId, name) VALUES($1, $2) RETURNING *",
      { bind: [userId, name], type: QueryTypes.INSERT }
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
    res.status(500).send(error);
  }
});

router.get("/userSongs", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;

    // Fetch songs based on user id
    const songs = await Song.findAll({
      where: { userid: userId },
    });
    res.json(songs);
    // This will only fetch from the song table, returning name, id , etc. (for song cards)
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/singleSong/id=:id", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const songId = req.params.id;

    const song = await Song.findOne({
      where: { id: songId },
    });

    if (song == null) {
      return res.status(404).send("Song was not found");
    }

    if (song.dataValues.userId != userId) {
      return res.status(403).send("Insufficient permissions! Nice try!");
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
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const songId = req.params.id;

    const status = confirmUserToSong(songId, userId);

    if (status === NOTFOUND) {
      res.status(404).send("Song was not found");
    }
    if (status === FORBIDDEN) {
      res.status(403).send("Insufficient permissions! Nice try!");
    }

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
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const songId = req.params.id;

    const status = confirmUserToSong(songId, userId);

    if (status === NOTFOUND) {
      res.status(404).send("Song was not found");
    }
    if (status === FORBIDDEN) {
      res.status(403).send("Insufficient permissions! Nice try!");
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

router.put("/updateChords", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const songId = req.params.id;
    const updatedChords = req.body.data.updatedChords;

    const status = confirmUserToSong(songId, userId);

    if (status === NOTFOUND) {
      res.status(404).send("Song was not found");
    }
    if (status === FORBIDDEN) {
      res.status(403).send("Insufficient permissions! Nice try!");
    }

    const statements = [];
    const tableName = "chords";

    updatedChords.forEach((chord) => {
      statements.push(
        sequelize.query(
          `UPDATE ${tableName} SET chordNotes='{${chord.chordArr}}', chordName='${chord.chordName}' WHERE id=${chord.chordId} RETURNING *`
        )
      );
    });
    const results = await Promise.all(statements);

    console.log(results);

    res.json(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/deleteChords", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const songId = req.params.id;
    const deletedChordIndicies = req.body.data.deletedChordIndicies;

    const status = confirmUserToSong(songId, userId);

    if (status === NOTFOUND) {
      res.status(404).send("Song was not found");
    }
    if (status === FORBIDDEN) {
      res.status(403).send("Insufficient permissions! Nice try!");
    }

    const statements = [];
    const tableName = "chords";

    deletedChordIndicies.forEach((chordIndex) => {
      statements.push(
        sequelize.query(
          `DELETE FROM ${tableName} WHERE id=${chordIndex} RETURNING *`
        )
      );
    });
    const results = await Promise.all(statements);

    console.log(results);

    res.json(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/insertChords", async (req, res) => {
  try {
    const userId = jwt.verify(req.cookies.token, config.secret).id;
    const songId = req.params.id;
    const newSong = req.body.data.newSong;

    const status = confirmUserToSong(songId, userId);

    if (status === NOTFOUND) {
      res.status(404).send("Song was not found");
    }
    if (status === FORBIDDEN) {
      res.status(403).send("Insufficient permissions! Nice try!");
    }

    const statements = [];
    const tableName = "chords";

    newSong.forEach((chord, i) => {
      // In the case of a chord that exists, we want to simply update it's index
      if (chord.chordId > -1) {
        statements.push(
          sequelize.query(
            `UPDATE ${tableName} SET chordIndex=${i} WHERE id=${chord.chordId} RETURNING *`
          )
        );
      }
      // Otherwise, we want to insert the new chord
      else {
        statements.push(
          sequelize.query(
            `INSERT INTO ${tableName}(songId, chordIndex, chordNotes, chordName) VALUES(${songId}, ${i}, '{${chord.chordArr}}', '${chord.chordName}') RETURNING *`
          )
        );
      }
    });
    const results = await Promise.all(statements);

    console.log(results);

    res.json(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

const confirmUserToSong = async (userId, songId) => {
  const song = await Song.findOne({
    where: { id: songId },
  });

  if (song == null) {
    return NOTFOUND;
  }

  if (song.dataValues.userId != userId) {
    return FORBIDDEN;
  }
};

module.exports = router;
