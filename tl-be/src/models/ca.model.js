"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ca extends Model {
    static associate(models) {
      this.hasMany(models.DonGaLuong, {
        foreignKey: "Ma_Ca",
        as: "DGL",
      });

      this.hasMany(models.LichLamViec, {
        foreignKey: "Ma_Ca",
        as: "LLV",
      });
    }
  }
  Ca.init(
    {
      Ma_Ca: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Gio_BD: DataTypes.TIME,
      Gio_KT: DataTypes.TIME,
      Ngay_LV: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Ca",
      tableName: "Ca",
      timestamps: false,
    }
  );
  return Ca;
};
