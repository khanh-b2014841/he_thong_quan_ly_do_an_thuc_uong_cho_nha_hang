"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class DonGaLuong extends Model {
    static associate(models) {
      this.belongsTo(models.Ca, {
        foreignKey: "Ma_Ca",
        as: "Ca",
      });
    }
  }
  DonGaLuong.init(
    {
      Ma_Ca: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      DGL: {
        type: DataTypes.FLOAT,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "DonGaLuong",
      tableName: "Don_Gia_Luong",
      timestamps: false,
    }
  );
  return DonGaLuong;
};
