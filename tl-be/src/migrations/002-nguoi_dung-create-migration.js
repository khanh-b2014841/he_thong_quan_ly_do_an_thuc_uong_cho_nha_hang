'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Nguoi_Dung', {
            Ma_ND: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            Ten_ND: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            Dia_Chi: {
                type: Sequelize.TEXT
            },
            Email: {
                type: Sequelize.STRING(500),
                unique: true,
                allowNull: false
            },
            SDT: {
                type: Sequelize.STRING,
            },
            Ngay_Sinh: {
                type: Sequelize.DATE
            },
            Gioi_Tinh: {
                type: Sequelize.INTEGER
            },
            Trang_Thai: {
                type: Sequelize.BOOLEAN,
            },
            Mat_Khau: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Token: {
                type: Sequelize.STRING,
                unique: true
            },
            Ma_VT: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Vai_Tro',
                    key: 'Ma_VT'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Nguoi_Dung')
    }
}