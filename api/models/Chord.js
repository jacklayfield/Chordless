const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "chords",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    songId: {
      field: "songid",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    chordNotes: {
      field: "chordnotes",
      type: Sequelize.STRING,
      validate: {
        args: true,
        msg: "Notes are required",
      },
    },
    chordName: {
      field: "chordname",
      type: Sequelize.STRING,
      validate: {
        args: true,
        msg: "Chord Name is required",
      },
    },
  },
  { timestamps: false }
);
