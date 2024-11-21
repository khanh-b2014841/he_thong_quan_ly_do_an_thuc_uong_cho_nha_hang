const db = require("../models");

const KhoServices = {
  async create(data) {
    return await db.Kho.create(data);
  },
  async update(Ma_Kho, data, transaction) {
    await db.Kho.update(data, { where: { Ma_Kho } }, transaction);

    return await db.Kho.findOne({
      where: { Ma_Kho },
      transaction,
    });
  },
  async getOne(Ma_Kho) {
    return await db.Kho.findOne({
      where: { Ma_Kho },
      include: [
        {
          model: db.ChiTietSanPham,
          as: "CTSP",
        },
        {
          model: db.ChiTietNguyenLieu,
          as: "CTNL",
        },
      ],
    });
  },
  async getAll(params) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const Loai_Kho = params.type;
    const where = {};

    if (typeof Loai_Kho !== "undefined") {
      where.Loai_Kho = JSON.parse(Loai_Kho);
    }

    return await db.Kho.findAndCountAll({
      offset,
      limit,
      ...(Object.keys(where).length > 0 && { where }),
      include: [
        {
          model: db.ChiTietSanPham,
          as: "CTSP",
        },
        {
          model: db.ChiTietNguyenLieu,
          as: "CTNL",
        },
      ],
    });
  },
  async delete(Ma_Kho) {
    return await db.Kho.destroy({
      where: { Ma_Kho },
    });
  },
};

module.exports = KhoServices;
