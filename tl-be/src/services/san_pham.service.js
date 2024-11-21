const db = require("../models");

const SanPhamServices = {
  async create(data) {
    return await db.SanPham.create(data);
  },
  async update(Ma_SP, data, transaction) {
    await db.SanPham.update(data, { where: { Ma_SP } }, transaction);

    return await db.SanPham.findOne({
      where: { Ma_SP },
      transaction,
    });
  },
  async getOne(Ma_SP) {
    return await db.SanPham.findOne({
      where: { Ma_SP },
      include: [
        {
          model: db.CongThuc,
          as: "Cong_Thucs",
        },
        {
          model: db.ChiTietSanPham,
          as: "San_Phams",
        },
      ],
    });
  },
  async getAll(params) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const order = params.order ?? "desc"; // sắp xếp giảm dần
    const Ten_SP = params.name;
    const orderCheck = [];
    const where = {};

    if (["desc", "asc"].includes(order)) {
      orderCheck.push(["updatedAt", order.toUpperCase()]);
    }

    if (Ten_SP) {
      where.Ten_SP = {
        [db.Sequelize.Op.like]: `%${Ten_SP}%`,
      };
    }

    return await db.SanPham.findAndCountAll({
      offset,
      limit,
      ...(Object.keys(where).length > 0 && { where }),
      include: [
        {
          model: db.CongThuc,
          as: "Cong_Thucs",
        },
        {
          model: db.ChiTietSanPham,
          as: "San_Phams",
        },
      ],
      order: [orderCheck],
    });
  },
  async delete(Ma_SP) {
    return await db.SanPham.destroy({
      where: { Ma_SP },
    });
  },
};

module.exports = SanPhamServices;
