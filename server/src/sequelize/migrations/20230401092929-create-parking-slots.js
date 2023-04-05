'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parking_slots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      floor_name: {
        type: Sequelize.STRING
      },
      in_use: {
        type: Sequelize.BOOLEAN
      },
      is_empty: {
        type: Sequelize.BOOLEAN
      },
      size: {
        type: Sequelize.STRING
      },
      size_sort: {
        type: Sequelize.STRING
      },
      floor_name: {
        type: Sequelize.STRING
      },
      slot_number: {
        type: Sequelize.STRING
      },
      p_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // User belongsTo Company 1:1
          model: 'parking_places',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('parking_slots');
  }
};