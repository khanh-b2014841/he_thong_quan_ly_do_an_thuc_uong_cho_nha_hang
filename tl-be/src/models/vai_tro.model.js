'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class VaiTro extends Model {
        static associate(models) {
            this.hasMany(models.NguoiDung, {
                foreignKey: 'Ma_VT',
                as: 'Nguoi_Dungs'
            })
        }
    }
    VaiTro.init({
        Ma_VT: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Key_VT: DataTypes.INTEGER,
        Ten_VT: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'VaiTro',
        tableName: 'Vai_Tro',
        timestamps: false
    });
    return VaiTro;
};
