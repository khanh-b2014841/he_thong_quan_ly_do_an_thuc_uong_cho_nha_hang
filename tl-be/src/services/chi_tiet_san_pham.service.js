const db = require("../models");

const ChiTietSanPhamServices = {
  async create(data) {
    return await db.ChiTietSanPham.create(data);
  },
  async update(params, data, transaction) {
    await db.ChiTietSanPham.update(data, { where: params }, transaction);

    return await db.ChiTietSanPham.findOne({
      where: params,
      transaction,
    });
  },
  async getOne(params) {
    return await db.ChiTietSanPham.findOne({
      where: params,
      include: [
        {
          model: db.Kho,
          as: "Kho",
        },
        {
          model: db.SanPham,
          as: "San_Pham",
        },
      ],
    });
  },
  async getAll(params) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const order = params.order ?? "desc"; // sắp xếp giảm dần
    const by = params.by ?? "Ngay_HH"; // ['Ngay_SX', 'Ngay_HH', 'So_Luong', 'Gia_Nhap', 'Gia_Xuat']
    const orderCheck = [];
    const Ma_Kho = params.kho;
    const Ma_SP = params.sp;
    const where = {};

    if (["desc", "asc"].includes(order)) {
      if (
        ["Ngay_SX", "Ngay_HH", "So_Luong", "Gia_Nhap", "Gia_Xuat"].includes(by)
      ) {
        orderCheck.push([by, order.toUpperCase()]);
      }
    }

    if (Ma_Kho) {
      where.Ma_Kho = Ma_Kho;
    }

    if (Ma_SP) {
      where.Ma_SP = Ma_SP;
    }

    return await db.ChiTietSanPham.findAndCountAll({
      offset,
      limit,
      ...(Object.keys(where).length > 0 && { where }),
      include: [
        {
          model: db.Kho,
          as: "Kho",
        },
        {
          model: db.SanPham,
          as: "San_Pham",
        },
      ],
      order: [orderCheck],
    });
  },
  async delete(params) {
    return await db.ChiTietSanPham.destroy({
      where: params,
    });
  },
};

module.exports = ChiTietSanPhamServices;
