'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NguoiDung extends Model {
        static associate(models) {
            this.belongsTo(models.VaiTro, {
                foreignKey: 'Ma_VT',
                as: 'Vai_Tro'
            })

            this.hasMany(models.LichLamViec, {
                foreignKey: 'Ma_ND',
                as: 'LLV'
            })
        }
    }
    NguoiDung.init({
        Ma_ND: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        Ten_ND: DataTypes.STRING,
        Dia_Chi: DataTypes.TEXT,
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        SDT: DataTypes.STRING,
        Ngay_Sinh: DataTypes.DATE,
        Gioi_Tinh: DataTypes.INTEGER,
        Mat_Khau: DataTypes.STRING,
        Token: DataTypes.STRING,
        Trang_Thai: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Ma_VT: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'NguoiDung',
        tableName: 'Nguoi_Dung',
        timestamps: true
    });
    return NguoiDung;
};
