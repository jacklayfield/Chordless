const express = require("express");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cors = require("cors");
const session = require("express-session");

dotenv.config();

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["random"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const sequelize = new Sequelize(process.env.DATABASE_URL);

// console.log(process.env.PGHOST);

app.listen("8000", () => {
  console.log("Server running...");
});

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
