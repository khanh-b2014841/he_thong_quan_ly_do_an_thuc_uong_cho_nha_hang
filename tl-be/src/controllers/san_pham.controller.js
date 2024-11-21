const db = require("../models");
const path = require("path");
const fs = require("fs");
const CongThucServices = require("../services/cong_thuc.service");
const SanPhamServices = require("../services/san_pham.service");
const ChiTietSanPhamServices = require("../services/chi_tiet_san_pham.service");

const SanPhamControllers = {
  async create(req, res) {
    const { Ten_SP, Mo_Ta } = req.body;

    if (!Ten_SP || !req.file) {
      return res.errorValid();
    }

    try {
      const filePath = path.join("uploads", req.file.filename);

      const sanPham = await SanPhamServices.create({
        Ten_SP,
        Mo_Ta: Mo_Ta ?? null,
        Hinh_Anh: filePath,
      });

      if (sanPham) {
        return res.successNoData("Thêm mới sản phẩm thành công!");
      }

      return res.error(404, "Thêm mới sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async update(req, res) {
    const { Ten_SP, Mo_Ta, Hinh_Anh } = req.body;
    const { ma } = req.params;

    if (!ma || !Ten_SP || !(req.file || Hinh_Anh)) {
      return res.errorValid();
    }

    const transaction = await db.sequelize.transaction();

    try {
      const data = {
        Ten_SP,
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

      const sanPham = await SanPhamServices.update(ma, data, transaction);

      if (sanPham) {
        await transaction.commit();
        return res.successNoData("Cập nhật sản phẩm thành công!");
      }

      await transaction.rollback();
      return res.error(404, "Cập nhật sản phẩm thất bại!");
    } catch (err) {
      await transaction.rollback();
      return res.errorServer();
    }
  },
  async getOne(req, res) {
    const { ma } = req.params;

    if (!ma) {
      return res.errorValid("mã sản phẩm không tồn tại!");
    }

    try {
      const sanPham = await SanPhamServices.getOne(ma);

      if (sanPham) {
        return res.success("Lấy sản phẩm thành công!", sanPham);
      }

      return res.error(404, "Lấy sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, name, order } = req.query;

    try {
      const sanPhams = await SanPhamServices.getAll({
        page,
        limit,
        name,
        order,
      });

      if (sanPhams) {
        return res.success("Lấy tất cả sản phẩm thành công!", {
          count: sanPhams.count,
          sanPhams: sanPhams.rows,
        });
      }

      return res.error(404, "Lấy tất cả sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { ma } = req.params;

    if (!ma) {
      return res.errorValid("mã sản phẩm không tồn tại!");
    }

    try {
      const chiTietSanPhams = await ChiTietSanPhamServices.getAll({
        sp: ma,
      });

      const congThucs = await CongThucServices.getAll({
        sp: ma,
      });

      if (chiTietSanPhams?.count > 0 || congThucs?.count > 0) {
        return res.errorValid("Sản phẩm không thể xóa!");
      }

      const data = await SanPhamServices.getOne(ma);

      if (data) {
        const filePath = path.join(__dirname, "../" + data.Hinh_Anh);
        if (typeof filePath === "string" && fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          const sanPham = await SanPhamServices.delete(ma);

          if (sanPham) {
            return res.successNoData("Xóa sản phẩm thành công!");
          }
        }
      }

      return res.error(404, "Xóa sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = SanPhamControllers;
