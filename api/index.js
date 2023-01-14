const express = require("express");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// console.log(process.env.PGHOST);

app.listen(8000);

const Song = sequelize.define(
  "songs",
  {
    id: {
      field: "name",
      type: Sequelize.STRING,
      primaryKey: true,
    },
  },
  { timestamps: false }
);

app.get("/api/songs", function (request, response) {
  Song.findAll().then((songs) => {
    response.json(songs);
  });
});
