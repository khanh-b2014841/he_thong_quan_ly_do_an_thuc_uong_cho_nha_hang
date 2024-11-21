'use strict';
const { ROLES } = require("../utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Vai_Tro',
            ROLES.map((role) => ({
                Ma_VT: role.id,
                Ten_VT: role.name,
                Key_VT: role.key
            }))
            , {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Vai_Tro', null, {});
    }
};
