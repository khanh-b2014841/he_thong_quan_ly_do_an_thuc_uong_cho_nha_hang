'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ChiTietNguyenLieu extends Model {
        static associate(models) {
            this.belongsTo(models.Kho, {
                foreignKey: 'Ma_Kho',
                as: 'Kho'
            })

            this.belongsTo(models.NguyenLieu, {
                foreignKey: 'Ma_NL',
                as: 'Nguyen_Lieu'
            })
        }
    }
    ChiTietNguyenLieu.init({
        Ma_Kho: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        Ma_NL: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        Gia_Nhap: DataTypes.INTEGER,
        Gia_Xuat: DataTypes.INTEGER,
        Khoi_Luong: DataTypes.DOUBLE,
        Ngay_SX: DataTypes.DATE,
        Ngay_HH: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ChiTietNguyenLieu',
        tableName: 'Chi_Tiet_Nguyen_Lieu',
        timestamps: false
    });
    return ChiTietNguyenLieu;
};
