const db = require("../models");
const CaServices = require("../services/ca.service");

const CaControllers = {
  async create(req, res) {
    const { Gio_BD, Gio_KT, Ngay_LV } = req.body;

    if (!Gio_BD || !Gio_KT || !Ngay_LV) {
      return res.errorValid();
    }

    try {
      const ca = await CaServices.create({
        Gio_BD,
        Gio_KT,
        Ngay_LV,
      });

      if (ca) {
        return res.successNoData("Thêm mới ca thành công!");
      }

      return res.error(404, "Thêm mới ca thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async update(req, res) {
    const { Gio_BD, Gio_KT, Ngay_LV } = req.body;
    const { ma } = req.params;

    if (!Gio_BD || !Gio_KT || !ma || !Ngay_LV) {
      return res.errorValid();
    }

    const transaction = await db.sequelize.transaction();

    try {
      const ca = await CaServices.update(
        ma,
        {
          Gio_BD,
          Gio_KT,
          Ngay_LV,
        },
        transaction
      );

      if (ca) {
        await transaction.commit();
        return res.successNoData("Cập nhật ca thành công!");
      }

      await transaction.rollback();
      return res.error(404, "Cập nhật ca thất bại!");
    } catch (err) {
      await transaction.rollback();
      return res.errorServer();
    }
  },
  async getOne(req, res) {
    const { ma } = req.params;

    if (!ma) {
      return res.errorValid("mã ca không tồn tại!");
    }

    try {
      const ca = await CaServices.getOne(ma);

      if (ca) {
        return res.success("Lấy ca thành công!", ca);
      }

      return res.error(404, "Lấy ca thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, order } = req.query;

    try {
      const cas = await CaServices.getAll({
        page,
        limit,
        order,
      });

      if (cas) {
        return res.success("Lấy tất cả ca thành công!", {
          count: cas.count,
          cas: cas.rows,
        });
      }

      return res.error(404, "Lấy tất cả ca thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { ma } = req.params;

    if (!ma) {
      return res.errorValid("mã ca không tồn tại!");
    }

    try {
      const ca = await CaServices.delete(ma);

      if (ca) {
        return res.successNoData("Xóa ca thành công!");
      }

      return res.error(404, "Xóa ca thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = CaControllers;
