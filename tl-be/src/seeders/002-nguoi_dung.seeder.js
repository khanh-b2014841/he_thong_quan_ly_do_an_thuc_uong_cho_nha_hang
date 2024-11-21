'use strict';
const { ROLEIDS } = require("../utils");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Nguoi_Dung', [
            {
                Ma_ND: '6db0c3a7-3666-441f-b0a2-5ff127bba96f',
                Ten_ND: 'admin',
                Dia_Chi: null,
                Email: 'admin@gmail.com',
                SDT: null,
                Ngay_Sinh: null,
                Gioi_Tinh: 0,
                Trang_Thai: false,
                Mat_Khau: '$2b$10$5CzN2GyUkBQMEehk./DC4u5ytmOrrcwY4ms/g/pFp5n5ujQaDFo2S', // hhhhhhhh
                Token: null,
                Ma_VT: ROLEIDS[0],
                createdAt: '2024-11-16T12:00:00.000Z',
                updatedAt: '2024-11-16T12:00:00.000Z'
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Nguoi_Dung', null, {});
    }
};
