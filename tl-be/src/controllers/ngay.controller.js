const NgayServices = require("../services/ngay.service");

const NgayControllers = {
  async create(req, res) {
    const { Ngay_LV } = req.body;

    if (!Ngay_LV) {
      return res.errorValid("ngày không tồn tại!");
    }

    try {
      const ngay = await NgayServices.create({
        Ngay_LV,
      });

      if (ngay) {
        return res.successNoData("Thêm mới ngày thành công!");
      }

      return res.error(404, "Thêm mới ngày thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getOne(req, res) {
    const { ngay } = req.params;

    if (!ngay) {
      return res.errorValid("ngày không tồn tại!");
    }

    try {
      const ngayInfo = await NgayServices.getOne(ngay);

      if (ngayInfo) {
        return res.success("Lấy ngày thành công!", ngayInfo);
      }

      return res.error(404, "Lấy ngày thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, order } = req.query;

    try {
      const ngays = await NgayServices.getAll({
        page,
        limit,
        order,
      });

      if (ngays) {
        return res.success("Lấy tất cả ngày thành công!", {
          count: ngays.count,
          ngays: ngays.rows,
        });
      }

      return res.error(404, "Lấy tất cả ngày thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { ngay } = req.body;

    if (!ngay) {
      return res.errorValid("ngày không tồn tại!");
    }

    try {
      const ngayDelete = await NgayServices.delete(ngay);

      if (ngayDelete) {
        return res.successNoData("Xóa ngày thành công!");
      }

      return res.error(404, "Xóa ngày thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = NgayControllers;
