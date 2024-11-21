"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SanPham extends Model {
    static associate(models) {
      this.hasMany(models.CongThuc, {
        foreignKey: "Ma_SP",
        as: "Cong_Thucs",
      });

      this.hasMany(models.ChiTietSanPham, {
        foreignKey: "Ma_SP",
        as: "San_Phams",
      });
    }
  }
  SanPham.init(
    {
      Ma_SP: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      Ten_SP: DataTypes.STRING,
      Hinh_Anh: DataTypes.STRING,
      Mo_Ta: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SanPham",
      tableName: "San_Pham",
      timestamps: true,
    }
  );
  return SanPham;
};
