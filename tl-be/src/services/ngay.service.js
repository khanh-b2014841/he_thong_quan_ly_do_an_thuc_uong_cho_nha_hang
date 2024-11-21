const db = require("../models");

const NgayServices = {
  async create(data) {
    return await db.Ngay.create(data);
  },
  async getOne(Ngay_LV) {
    return await db.Ngay.findOne({
      where: { Ngay_LV },
      include: [
        {
          model: db.DonGaLuong,
          as: "DGL",
        },
        {
          model: db.LichLamViec,
          as: "LLV",
        },
      ],
    });
  },
  async getAll(params) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const order = params.order ?? "desc"; // sắp xếp giảm dần
    const orderCheck = [];

    if (["desc", "asc"].includes(order)) {
      orderCheck.push(["Ngay_LV", order.toUpperCase()]);
    }

    return await db.Ngay.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: db.DonGaLuong,
          as: "DGL",
        },
        {
          model: db.LichLamViec,
          as: "LLV",
        },
      ],
      order: [orderCheck],
    });
  },
  async delete(Ngay_LV) {
    return await db.Ngay.destroy({
      where: { Ngay_LV },
    });
  },
};

module.exports = NgayServices;
