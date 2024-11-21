const db = require("../models");

const DonGiaLuongServices = {
  async create(data) {
    return await db.DonGaLuong.create(data);
  },
  async getAll(params) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;

    return await db.DonGaLuong.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: db.Ca,
          as: "Ca",
        },
      ],
    });
  },
  async delete(params) {
    return await db.DonGaLuong.destroy({
      where: params,
    });
  },
};

module.exports = DonGiaLuongServices;
