'use strict';
const parkingSlots = require('../seed-data/parking-slots')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parking_slots', parkingSlots);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parking_slots', parkingSlots);
  }
};
