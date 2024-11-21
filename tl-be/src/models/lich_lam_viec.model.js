"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class LichLamViec extends Model {
    static associate(models) {
      this.belongsTo(models.Ca, {
        foreignKey: "Ma_Ca",
        as: "Ca",
      });

      this.belongsTo(models.NguoiDung, {
        foreignKey: "Ma_ND",
        as: "Nguoi_Dung",
      });
    }
  }
  LichLamViec.init(
    {
      Ma_Ca: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      Ma_ND: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      Cham_Cong: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "LichLamViec",
      tableName: "Lich_Lam_Viec",
      timestamps: false,
    }
  );
  return LichLamViec;
};
