const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "songs",
  {
    id: {
      field: "id",
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      field: "name",
      type: Sequelize.STRING,
      validate: {
        args: true,
        msg: "Name is required",
      },
    },
  },
  { timestamps: false }
);
