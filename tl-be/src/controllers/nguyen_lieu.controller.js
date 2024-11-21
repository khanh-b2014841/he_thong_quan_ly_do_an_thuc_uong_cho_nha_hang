const db = require("../models");
const path = require("path");
const fs = require("fs");
const NguyenLieuServices = require("../services/nguyen_lieu.service");
const ChiTietNguyenLieuServices = require("../services/chi_tiet_nguyen_lieu.service");
const CongThucServices = require("../services/cong_thuc.service");

const NguyenLieuControllers = {
  async create(req, res) {
    const { Ten_NL, Mo_Ta, Ma_NSX } = req.body;

    if (!Ten_NL || !Ma_NSX || !req.file) {
      return res.errorValid();
    }

    try {
      const filePath = path.join("uploads", req.file.filename);

      const nguyenLieu = await NguyenLieuServices.create({
        Ten_NL,
        Mo_Ta: Mo_Ta ?? null,
        Ma_NSX,
        Hinh_Anh: filePath,
      });

      if (nguyenLieu) {
        return res.successNoData("Thêm mới nguyên liệu thành công!");
      }

      return res.error(404, "Thêm mới nguyên liệu thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async update(req, res) {
    const { Ten_NL, Mo_Ta, Ma_NSX, Hinh_Anh } = req.body;
    const { ma } = req.params;

    if (!ma || !Ten_NL || !Ma_NSX || !(req.file || Hinh_Anh)) {
      return res.errorValid();
    }

    const transaction = await db.sequelize.transaction();

    try {
      const data = {
        Ten_NL,
        Ma_NSX,
      };

      if (Mo_Ta) {
        data.Mo_Ta = Mo_Ta;
      }

      if (req.file) {
        data.Hinh_Anh = path.join("uploads", req.file.filename);
      }

      if (Hinh_Anh) {
        data.Hinh_Anh = Hinh_Anh;
      }

      const nguyenLieu = await NguyenLieuServices.update(ma, data, transaction);

      if (nguyenLieu) {
        await transaction.commit();
        return res.successNoData("Cập nhật nguyên liệu thành công!");
      }

      await transaction.rollback();
      return res.error(404, "Cập nhật nguyên liệu thất bại!");
    } catch (err) {
      await transaction.rollback();
      return res.errorServer();
    }
  },
  async getOne(req, res) {
    const { ma } = req.params;

    if (!ma) {
      return res.errorValid("mã nguyên liệu không tồn tại!");
    }

    try {
      const nguyenLieu = await NguyenLieuServices.getOne(ma);

      if (nguyenLieu) {
        return res.success("Lấy nguyên liệu thành công!", nguyenLieu);
      }

      return res.error(404, "Lấy nguyên liệu thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, name, nsx } = req.query;

    try {
      const nguyenLieus = await NguyenLieuServices.getAll({
        page,
        limit,
        name,
        nsx,
      });

      if (nguyenLieus) {
        return res.success("Lấy tất cả nguyên liệu thành công!", {
          count: nguyenLieus.count,
          nguyenLieus: nguyenLieus.rows,
        });
      }

      return res.error(404, "Lấy tất cả nguyên liệu thất bại!");
    } catch (err) {
      console.log(err);
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { ma } = req.params;

    if (!ma) {
      return res.errorValid("mã nguyên liệu không tồn tại!");
    }

    try {
      const chiTietNguyenLieus = await ChiTietNguyenLieuServices.getAll({
        nl: ma,
      });

      const congThucs = await CongThucServices.getAll({
        nl: ma,
      });

      if (chiTietNguyenLieus?.count > 0 || congThucs?.count > 0) {
        return res.errorValid("Nguyên liệu không thể xóa!");
      }

      const data = await NguyenLieuServices.getOne(ma);

      if (data) {
        const filePath = path.join(__dirname, "../" + data.Hinh_Anh);
        if (typeof filePath === "string" && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          const nguyenLieu = await NguyenLieuServices.delete(ma);

          if (nguyenLieu) {
            return res.successNoData("Xóa nguyên liệu thành công!");
          }
        }
      }

      return res.error(404, "Xóa nguyên liệu thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = NguyenLieuControllers;
