'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
     id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
     },
     email: {
      type: Sequelize.STRING,
      unique: true
     },
     password: {
      type: Sequelize.STRING
     },
     folderName: {
      type: Sequelize.STRING
     },
     createdAt: {
      type: Sequelize.DATE
     },
     updatedAt: {
      type: Sequelize.DATE
     }
    });
   },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
