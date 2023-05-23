const express = require("express");
const dotenv = require("dotenv");
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authGoogleRoute = require("./routes/auth-google");
const authStandardRoute = require("./routes/auth-standard");
const cors = require("cors");
const songRoute = require("./routes/songs");
const userRoute = require("./routes/users");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(cookieParser());

app.use(cors(corsOptions));

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

app.use(express.json());
app.use("/auth-google", authGoogleRoute);
app.use("/api/auth-standard", authStandardRoute);
app.use("/api/songs", songRoute);
app.use("/api/users", userRoute);

// console.log(process.env.PGHOST);

app.listen("8000", () => {
  console.log("Server running...");
});
