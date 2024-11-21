'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Nha_San_Xuat', {
            Ma_NSX: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            Ten_NSX: {
                type: Sequelize.STRING(500),
                allowNull: false
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
        await queryInterface.dropTable('Nha_San_Xuat')
    }
}