'use strict';
const parkingData = require("../seed-data/parking-places");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parking_places', parkingData);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parking_places', parkingData);
  }
};
