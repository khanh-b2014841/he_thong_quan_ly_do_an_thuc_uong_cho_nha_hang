"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Ca", {
      Ma_Ca: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      Gio_BD: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Gio_KT: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Ngay_LV: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Ca");
  },
};
