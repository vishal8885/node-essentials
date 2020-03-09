"use strict";
var { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define(
    "Person",
    {
      name: {
        type: DataTypes.STRING
      },
      id: {
        type: DataTypes.STRING,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      skills: {
        type: DataTypes.STRING,
        get: function() {
          return JSON.parse(this.getDataValue("skills"));
        },
        set: function(val) {
          return this.setDataValue("skills", JSON.stringify(val));
        }
      }
    },
    {}
  );
  Person.associate = function(models) {
    // associations can be defined here
  };
  return Person;
};
