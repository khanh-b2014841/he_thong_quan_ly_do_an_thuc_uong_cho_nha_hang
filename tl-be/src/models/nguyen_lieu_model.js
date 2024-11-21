'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NguyenLieu extends Model {
        static associate(models) {
            this.belongsTo(models.NhaSanXuat, {
                foreignKey: 'Ma_NSX',
                as: 'NSX'
            })

            this.hasMany(models.CongThuc, {
                foreignKey: 'Ma_NL',
                as: 'Cong_Thucs'
            })

            this.hasMany(models.ChiTietNguyenLieu, {
                foreignKey: 'Ma_NL',
                as: 'CTNL'
            })
        }
    }
    NguyenLieu.init({
        Ma_NL: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Ten_NL: DataTypes.STRING,
        Hinh_Anh: DataTypes.STRING,
        Mo_Ta: DataTypes.TEXT,
        Ma_NSX: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NguyenLieu',
        tableName: 'Nguyen_Lieu',
        timestamps: true
    });
    return NguyenLieu;
};
