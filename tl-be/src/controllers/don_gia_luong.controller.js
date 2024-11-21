const DonGiaLuongServices = require("../services/don_gia_luong.service");

const DonGaLuongControllers = {
  async create(req, res) {
    const { Ma_Ca, Ngay_LV, DGL } = req.body;

    if (!Ma_Ca || !Ngay_LV || !DGL) {
      return res.errorValid();
    }

    try {
      const donGiaLuong = await DonGiaLuongServices.create({
        Ma_Ca,
        Ngay_LV,
        DGL,
      });

      if (donGiaLuong) {
        return res.successNoData("Thêm mới đơn giá lương thành công!");
      }

      return res.error(404, "Thêm mới đơn giá lương thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit } = req.query;

    try {
      const donGiaLuongs = await DonGiaLuongServices.getAll({
        page,
        limit,
      });

      if (donGiaLuongs) {
        return res.success("Lấy tất cả đơn giá lương thành công!", {
          count: donGiaLuongs.count,
          donGiaLuongs: donGiaLuongs.rows,
        });
      }

      return res.error(404, "Lấy tất cả đơn giá lương thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { ca, ngay, dgl } = req.query;

    if (!ca || !ngay || !dgl) {
      return res.errorValid();
    }

    try {
      const donGiaLuong = await DonGiaLuongServices.delete({
        Ma_Ca: ca,
        Ngay_LV: ngay,
        DGL: dgl,
      });

      if (donGiaLuong) {
        return res.successNoData("Xóa đơn giá lương thành công!");
      }

      return res.error(404, "Xóa đơn giá lương thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = DonGaLuongControllers;
