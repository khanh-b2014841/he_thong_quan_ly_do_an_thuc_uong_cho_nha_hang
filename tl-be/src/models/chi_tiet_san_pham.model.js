'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChiTietSanPham extends Model {
        static associate(models) {
            this.belongsTo(models.Kho, {
                foreignKey: 'Ma_Kho',
                as: 'Kho'
            })

            this.belongsTo(models.SanPham, {
                foreignKey: 'Ma_SP',
                as: 'San_Pham'
            })
        }
    }
    ChiTietSanPham.init({
        Ma_Kho: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        Ma_SP: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        Gia_Nhap: DataTypes.INTEGER,
        Gia_Xuat: DataTypes.INTEGER,
        So_Luong: DataTypes.INTEGER,
        Ngay_SX: DataTypes.DATE,
        Ngay_HH: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ChiTietSanPham',
        tableName: 'Chi_Tiet_San_Pham',
        timestamps: false
    });
    return ChiTietSanPham;
};
