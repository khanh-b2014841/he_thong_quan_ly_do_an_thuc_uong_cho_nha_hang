"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Lich_Lam_Viec", {
      Ma_Ca: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Ca",
          key: "Ma_Ca",
        },
      },
      Ma_ND: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Nguoi_Dung",
          key: "Ma_ND",
        },
      },
      Cham_Cong: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Lich_Lam_Viec");
  },
};
