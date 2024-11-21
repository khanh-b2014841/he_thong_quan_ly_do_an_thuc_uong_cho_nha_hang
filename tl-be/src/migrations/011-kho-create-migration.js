'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Kho', {
            Ma_Kho: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            Loai_Kho: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            Ghi_Chu: {
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
        await queryInterface.dropTable('Kho')
    }
}