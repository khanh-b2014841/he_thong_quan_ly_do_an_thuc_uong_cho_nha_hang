const db = require("../models");

const ChiTietNguyenLieuServices = {
  async create(data) {
    return await db.ChiTietNguyenLieu.create(data);
  },
  async update(params, data, transaction) {
    await db.ChiTietNguyenLieu.update(data, { where: params }, transaction);

    return await db.ChiTietNguyenLieu.findOne({
      where: params,
      transaction,
    });
  },
  async getOne(params) {
    return await db.ChiTietNguyenLieu.findOne({
      where: params,
      include: [
        {
          model: db.NguyenLieu,
          as: "Nguyen_Lieu",
        },
        {
          model: db.Kho,
          as: "Kho",
        },
      ],
    });
  },
  async getAll(params) {
    const page = parseInt(params?.page);
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const order = params.order ?? "desc"; // sắp xếp giảm dần
    const by = params.by ?? "Ngay_HH"; // ["Ngay_SX", "Ngay_HH", "Khoi_Luong", "Gia_Nhap", "Gia_Xuat"]
    const orderCheck = [];
    const Ma_Kho = params.kho;
    const Ma_NL = params.nl;
    const where = {};

    if (["desc", "asc"].includes(order)) {
      if (
        ["Ngay_SX", "Ngay_HH", "Khoi_Luong", "Gia_Nhap", "Gia_Xuat"].includes(
          by
        )
      ) {
        orderCheck.push([by, order.toUpperCase()]);
      }
    }

    if (Ma_Kho) {
      where.Ma_Kho = Ma_Kho;
    }

    if (Ma_NL) {
      where.Ma_NL = Ma_NL;
    }

    const checkParams = {
      ...(Object.keys(where).length > 0 && { where }),
      include: [
        {
          model: db.Kho,
          as: "Kho",
        },
        {
          model: db.NguyenLieu,
          as: "Nguyen_Lieu",
        },
      ],
      order: [orderCheck],
    };

    if (page) {
      checkParams.offset = offset;
      checkParams.limit = limit;
    }

    return await db.ChiTietNguyenLieu.findAndCountAll(checkParams);
  },
  async delete(params) {
    return await db.ChiTietNguyenLieu.destroy({
      where: params,
    });
  },
};

module.exports = ChiTietNguyenLieuServices;
