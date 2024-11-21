'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Vai_Tro', {
            Ma_VT: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            Ten_VT: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            Key_VT: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Vai_Tro')
    }
}