const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "users",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    username: {
      field: "username",
      type: Sequelize.STRING,
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
