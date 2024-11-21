'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NhaSanXuat extends Model {
        static associate(models) {
            this.hasMany(models.NguyenLieu, {
                foreignKey: 'Ma_NSX',
                as: 'Nguyen_Lieus'
            })
        }
    }
    NhaSanXuat.init({
        Ma_NSX: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Ten_NSX: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NhaSanXuat',
        tableName: 'Nha_San_Xuat',
        timestamps: true
    });
    return NhaSanXuat;
};
