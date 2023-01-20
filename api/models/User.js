const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "user",
  {
    username: {
      field: "username",
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
