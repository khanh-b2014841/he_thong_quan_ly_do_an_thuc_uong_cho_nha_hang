"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Chi_Tiet_Nguyen_Lieu", {
      Ma_Kho: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Kho",
          key: "Ma_Kho",
        },
      },
      Ma_NL: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Nguyen_Lieu",
          key: "Ma_NL",
        },
      },
      Gia_Nhap: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Gia_Xuat: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Khoi_Luong: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      Ngay_SX: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      Ngay_HH: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Chi_Tiet_Nguyen_Lieu");
  },
};
