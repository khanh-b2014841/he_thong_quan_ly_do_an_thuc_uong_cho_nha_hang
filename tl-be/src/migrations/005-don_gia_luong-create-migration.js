"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Don_Gia_Luong", {
      Ma_Ca: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Ca",
          key: "Ma_Ca",
        },
      },
      DGL: {
        type: Sequelize.FLOAT,
        allowNull: false,
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Don_Gia_Luong");
  },
};
