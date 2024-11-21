const LichLamViecServices = require("../services/lich_lam_viec.service");

const LichLamViecControllers = {
  async create(req, res) {
    const { Ma_Ca, Ngay_LV, Ma_ND, Cham_Cong } = req.body;

    if (!Ma_Ca || !Ngay_LV || !Ma_ND || typeof Cham_Cong === "undefined") {
      return res.errorValid();
    }

    try {
      const lichLamViec = await LichLamViecServices.create({
        Ma_Ca,
        Ngay_LV,
        Ma_ND,
        Cham_Cong: JSON.parse(Cham_Cong),
      });

      if (lichLamViec) {
        return res.successNoData("Thêm mới lịch làm việc thành công!");
      }

      return res.error(404, "Thêm mới lịch làm việc thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, ca, nd, cong } = req.query;

    try {
      const lichLamViecs = await LichLamViecServices.getAll({
        page,
        limit,
        ca,
        nd,
        cong,
      });

      if (lichLamViecs) {
        return res.success("Lấy tất cả lịch làm việc thành công!", {
          count: lichLamViecs.count,
          lichLamViecs: lichLamViecs.rows,
        });
      }

      return res.error(404, "Lấy tất cả lịch làm việc thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async delete(req, res) {
    const { ca, ngay, nd } = req.query;

    if (!ca || !ngay || !nd) {
      return res.errorValid();
    }

    try {
      const lichLamViec = await LichLamViecServices.delete({
        Ma_Ca: ca,
        Ngay_LV: ngay,
        Ma_ND: nd,
      });

      if (lichLamViec) {
        return res.successNoData("Xóa lịch làm việc thành công!");
      }

      return res.error(404, "Xóa lịch làm việc thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
};

module.exports = LichLamViecControllers;
