'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Kho extends Model {
        static associate(models) {
            this.hasMany(models.ChiTietSanPham, {
                foreignKey: 'Ma_Kho',
                as: 'CTSP'
            })

            this.hasMany(models.ChiTietNguyenLieu, {
                foreignKey: 'Ma_Kho',
                as: 'CTNL'
            })
        }
    }
    Kho.init({
        Ma_Kho: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Loai_Kho: DataTypes.BOOLEAN,
        Ghi_Chu: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Kho',
        tableName: 'Kho',
        timestamps: true
    });
    return Kho;
};
