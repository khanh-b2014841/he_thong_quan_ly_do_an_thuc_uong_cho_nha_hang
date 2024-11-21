'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cong_Thuc', {
            Ma_NL: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'Nguyen_Lieu',
                    key: 'Ma_NL'
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
            Khoi_Luong: {
                type: Sequelize.DOUBLE,
                allowNull: false
            },
            Mo_Ta: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('Cong_Thuc')
    }
}