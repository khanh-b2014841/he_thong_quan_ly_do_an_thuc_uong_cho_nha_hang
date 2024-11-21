const db = require("../models");
const ChiTietSanPhamServices = require("../services/chi_tiet_san_pham.service");

const ChiTietSanPhamControllers = {
  async create(req, res) {
    const { Ma_Kho, Ma_SP, Gia_Nhap, Gia_Xuat, So_Luong, Ngay_SX, Ngay_HH } =
      req.body;

    if (
      (isNaN(+Gia_Nhap) && isNaN(+Gia_Xuat)) ||
      isNaN(+So_Luong) ||
      !Ma_Kho ||
      !Ma_SP ||
      !Ngay_HH ||
      !Ngay_SX
    ) {
      return res.errorValid();
    }

    try {
      const chiTietSanPham = await ChiTietSanPhamServices.create({
        Ma_Kho,
        Ma_SP,
        Gia_Nhap: +Gia_Nhap,
        Gia_Xuat: +Gia_Xuat,
        So_Luong: +So_Luong,
        Ngay_SX,
        Ngay_HH,
      });

      if (chiTietSanPham) {
        return res.successNoData("Thêm mới chi tiết sản phẩm thành công!");
      }

      return res.error(404, "Thêm mới chi tiết sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async update(req, res) {
    const { Gia_Nhap, Gia_Xuat, So_Luong, Ngay_SX, Ngay_HH } = req.body;
    const { kho, sp } = req.query;

    if (
      (isNaN(+Gia_Nhap) && isNaN(+Gia_Xuat)) ||
      isNaN(+So_Luong) ||
      !kho ||
      !sp ||
      !Ngay_HH ||
      !Ngay_SX
    ) {
      return res.errorValid();
    }

    const transaction = await db.sequelize.transaction();

    try {
      const chiTietSanPham = await ChiTietSanPhamServices.update(
        {
          Ma_Kho: kho,
          Ma_SP: sp,
        },
        {
          Gia_Nhap: +Gia_Nhap,
          Gia_Xuat: +Gia_Xuat,
          So_Luong: +So_Luong,
          Ngay_SX,
          Ngay_HH,
        },
        transaction
      );

      if (chiTietSanPham) {
        await transaction.commit();
        return res.successNoData("Cập nhật chi tiết sản phẩm thành công!");
      }

      await transaction.rollback();
      return res.error(404, "Cập nhật chi tiết sản phẩm thất bại!");
    } catch (err) {
      await transaction.rollback();
      return res.errorServer();
    }
  },
  async getOne(req, res) {
    const { kho, sp } = req.query;

    if (!kho || !sp) {
      return res.errorValid("mã kho hoặc mã sản phẩm không tồn tại!");
    }

    try {
      const chiTietSanPham = await ChiTietSanPhamServices.getOne({
        Ma_Kho: kho,
        Ma_SP: sp,
      });

      if (chiTietSanPham) {
        return res.success("Lấy chi tiết sản phẩm thành công!", chiTietSanPham);
      }

      return res.error(404, "Lấy chi tiết sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, order, by, kho, sp } = req.query;

    try {
      const chiTietSanPhams = await ChiTietSanPhamServices.getAll({
        page,
        limit,
        order,
        by,
        kho,
        sp,
      });

      if (chiTietSanPhams) {
        return res.success("Lấy tất cả chi tiết sản phẩm thành công!", {
          count: chiTietSanPhams.count,
          chiTietSanPhams: chiTietSanPhams.rows,
        });
      }

      return res.error(404, "Lấy tất cả chi tiết sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { kho, sp } = req.query;

    if (!kho || !sp) {
      return res.errorValid("mã kho hoặc mã sản phẩm không tồn tại!");
    }

    try {
      const chiTietSanPham = await ChiTietSanPhamServices.delete({
        Ma_Kho: kho,
        Ma_SP: sp,
      });

      if (chiTietSanPham) {
        return res.successNoData("Xóa chi tiết sản phẩm thành công!");
      }

      return res.error(404, "Xóa chi tiết sản phẩm thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = ChiTietSanPhamControllers;
