const sequelize = require("./../database/sequelize");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "refreshtokens",
  {
    tokenValue: {
      field: "tokenvalue",
      type: Sequelize.STRING,
      primaryKey: true,
    },
  },
  { timestamps: false }
);
