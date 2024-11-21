'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CongThuc extends Model {
        static associate(models) {
            this.belongsTo(models.NguyenLieu, {
                foreignKey: 'Ma_NL',
                as: 'Nguyen_Lieu'
            })

            this.belongsTo(models.SanPham, {
                foreignKey: 'Ma_SP',
                as: 'San_Pham'
            })
        }
    }
    CongThuc.init({
        Ma_NL: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        Ma_SP: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        Khoi_Luong: DataTypes.DOUBLE,
        Mo_Ta: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'CongThuc',
        tableName: 'Cong_Thuc',
        timestamps: true
    });
    return CongThuc;
};
