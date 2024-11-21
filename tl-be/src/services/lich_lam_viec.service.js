const db = require("../models");

const LichLamViecServices = {
  async create(data) {
    return await db.LichLamViec.create(data);
  },
  async getAll(params) {
    const page = parseInt(params?.page) || 1;
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const Ma_Ca = params.ca;
    const Ma_ND = params.nd;
    const Cham_Cong = params.cong;
    const where = {};

    if (Ma_Ca) {
      where.Ma_Ca = Ma_Ca;
    }

    if (Ma_ND) {
      where.Ma_ND = Ma_ND;
    }

    if (typeof Cham_Cong !== "undefined") {
      where.Cham_Cong = JSON.parse(Cham_Cong);
    }

    return await db.LichLamViec.findAndCountAll({
      offset,
      limit,
      ...(Object.keys(where).length > 0 && { where }),
      include: [
        {
          model: db.Ca,
          as: "Ca",
        },
        {
          model: db.NguoiDung,
          as: "Nguoi_Dung",
        },
      ],
    });
  },
  async delete(params) {
    return await db.LichLamViec.destroy({
      where: params,
    });
  },
};

module.exports = LichLamViecServices;
