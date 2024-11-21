const db = require("../models");

const NhaSanXuatServices = {
  async create(data) {
    return await db.NhaSanXuat.create(data);
  },
  async update(Ma_NSX, Ten_NSX) {
    const nsx = await db.NhaSanXuat.findOne({
      where: { Ma_NSX },
    });

    if (nsx) {
      nsx.Ten_NSX = Ten_NSX;
      await nsx.save();
    }
    return null;
  },
  async getOne(Ma_NSX) {
    return await db.NhaSanXuat.findOne({
      where: { Ma_NSX },
      include: [
        {
          model: db.NguyenLieu,
          as: "Nguyen_Lieus",
        },
      ],
    });
  },
  async getAll(params) {
    const page = parseInt(params?.page);
    const limit = parseInt(params?.limit) || 10;
    const offset = (page - 1) * limit;
    const Ten_NSX = params.name;
    const where = {};

    if (Ten_NSX) {
      where.Ten_NSX = {
        [db.Sequelize.Op.like]: `%${Ten_NSX}%`,
      };
    }

    const checkParams = {
      ...(Object.keys(where).length > 0 && { where }),
      include: [
        {
          model: db.NguyenLieu,
          as: "Nguyen_Lieus",
        },
      ],
    };

    if (page) {
      checkParams.offset = offset;
      checkParams.limit = limit;
    }

    return await db.NhaSanXuat.findAndCountAll(checkParams);
  },
  async delete(Ma_NSX) {
    return await db.NhaSanXuat.destroy({
      where: { Ma_NSX },
    });
  },
};

module.exports = NhaSanXuatServices;
