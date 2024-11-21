'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Nguyen_Lieu', {
            Ma_NL: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            Ten_NL: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            Hinh_Anh: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            Mo_Ta: {
                type: Sequelize.TEXT,
            },
            Ma_NSX: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Nha_San_Xuat',
                    key: 'Ma_NSX'
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
        await queryInterface.dropTable('Nguyen_Lieu')
    }
}