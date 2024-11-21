"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("San_Pham", {
      Ma_SP: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      Ten_SP: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      Hinh_Anh: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      Mo_Ta: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("San_Pham");
  },
};
