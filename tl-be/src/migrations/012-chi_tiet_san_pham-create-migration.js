'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Chi_Tiet_San_Pham', {
            Ma_Kho: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Kho',
                    key: 'Ma_Kho'
                }
            },
            Ma_SP: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'San_Pham',
                    key: 'Ma_SP'
                }
            },
            Gia_Nhap: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Gia_Xuat: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            So_Luong: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            Ngay_SX: {
                allowNull: false,
                type: Sequelize.DATE
            },
            Ngay_HH: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Chi_Tiet_San_Pham')
    }
}