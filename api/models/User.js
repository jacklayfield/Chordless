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
      unique: true,
    },
    email: {
      field: "email",
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      field: "password",
      type: Sequelize.STRING,
    },
    name: {
      field: "name",
      type: Sequelize.STRING,
    },
    bio: {
      field: "bio",
      type: Sequelize.STRING,
    },
    preferences: {
      field: "preferences",
      type: Sequelize.STRING,
    },
  },
  { timestamps: false }
);
