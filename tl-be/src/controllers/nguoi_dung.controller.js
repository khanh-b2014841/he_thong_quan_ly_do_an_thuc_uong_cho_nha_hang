const db = require("../models");
const NguoiDungServices = require("../services/nguoi_dung.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isValidPassword } = require("../utils");
const AuthServices = require("../services/auth.service");

const NguoiDungControllers = {
  async create(req, res) {
    const { Ten_ND, Email, Trang_Thai, Ma_VT, Mat_Khau } = req.body;

    if (!Ten_ND || !Email || !Mat_Khau || !Ma_VT) {
      return res.errorValid();
    }

    try {
      const hashedPassword = await bcrypt.hash(Mat_Khau, +process.env.SALT);

      const data = {
        Ten_ND,
        Email,
        Ma_VT,
        Mat_Khau: hashedPassword,
      };

      if (typeof Trang_Thai !== "undefined") {
        data.Trang_Thai = JSON.parse(Trang_Thai);
      }

      const nguoiDung = await NguoiDungServices.create(data);

      if (nguoiDung) {
        return res.successNoData("Thêm mới vai trò thành công!");
      }

      return res.error(404, "Thêm mới vai trò thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async update(req, res) {
    const { Ten_ND, Dia_Chi, SDT, Ngay_Sinh, Gioi_Tinh } = req.body;
    const { ma } = req.params;

    if (!Ten_ND || !ma) {
      return res.errorValid();
    }

    const transaction = await db.sequelize.transaction();

    try {
      const data = {
        Ten_ND,
        Dia_Chi: Dia_Chi ?? null,
        Ngay_Sinh: Ngay_Sinh ?? null,
      };

      if (typeof Gioi_Tinh !== "undefined") {
        data.Gioi_Tinh = JSON.parse(Gioi_Tinh);
      }

      if (SDT && isValidPassword(SDT)) {
        data.SDT = SDT;
      }

      const nguoiDung = await NguoiDungServices.update(ma, data, transaction);

      if (nguoiDung) {
        await transaction.commit();
        return res.successNoData("Cập nhật vai trò thành công!");
      }

      await transaction.rollback();
      return res.error(404, "Cập nhật vai trò thất bại!");
    } catch (err) {
      await transaction.rollback();
      return res.errorServer();
    }
  },
  async logIn(req, res) {
    const { Email, Mat_Khau } = req.body;

    if (!Email || !Mat_Khau) {
      return res.errorValid();
    }

    try {
      const nguoiDung = await NguoiDungServices.getOne({ Email }, true);

      if (nguoiDung && (await bcrypt.compare(Mat_Khau, nguoiDung.Mat_Khau))) {
        const refreshToken = AuthServices.generateRefreshToken({
          Ma_ND: nguoiDung.Ma_ND,
          Key_VT: nguoiDung.Vai_Tro?.Key_VT,
        });
        const accessToken = AuthServices.generateAccessToken({
          Ma_ND: nguoiDung.Ma_ND,
          Key_VT: nguoiDung.Vai_Tro?.Key_VT,
        });

        nguoiDung.Token = refreshToken;
        await nguoiDung.save();

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
          maxAge: 24 * 60 * 60 * 1000, // Thời hạn cookie (1 ngày)
        });

        const data = nguoiDung;
        data.Mat_Khau = "_";

        return res.success("Đăng nhập thành công!", {
          token: accessToken,
          nguoiDung: data,
        });
      }

      return res.error(404, "Email hoặc mật khẩu không khớp!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async getAll(req, res) {
    const { page, limit, role, status } = req.params;
    try {
      const nguoiDungs = await NguoiDungServices.getAll({
        page,
        limit,
        role,
        status,
      });

      if (nguoiDungs) {
        return res.success("Lấy tất cả người dùng thành công!", {
          count: nguoiDungs.count,
          nguoiDungs: nguoiDungs.rows,
        });
      }

      return res.error(404, "Lấy tất cả người dùng thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async updateAccessToken(req, res) {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      return res.error(404, "Refresh token chưa được cấp!");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.error(404, "Refresh token không tồn tại!");
      }

      const accessToken = AuthServices.generateAccessToken(data);

      return res.success("Cập nhật token thành công!", {
        token: accessToken,
      });
    });
  },
  async getOne(req, res) {
    const { Ma_ND } = req;

    if (!Ma_ND) {
      return res.errorValid("mã người dùng không tồn tại!");
    }

    try {
      const nguoiDung = await NguoiDungServices.getOne({ Ma_ND });

      if (nguoiDung) {
        return res.success("Lấy thông tin người dùng thành công!", nguoiDung);
      }

      return res.error(404, "Lấy thông tin người dùng thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async lock(req, res) {
    const { Ma_ND, Trang_Thai } = req.body;

    if (!Ma_ND || typeof Trang_Thai === "undefined") {
      return res.errorValid();
    }

    try {
      const nguoiDung = await NguoiDungServices.getOne({ Ma_ND });
      nguoiDung.Trang_Thai = JSON.parse(Trang_Thai);
      await nguoiDung.save();

      if (nguoiDung) {
        return res.successNoData("Thay đổi trạng thái người dùng thành công!");
      }

      return res.error(404, "Thay đổi trạng thái người dùng thất bại!");
    } catch (err) {
      return res.errorServer();
    }
  },
  async logout(req, res) {
    const { Ma_ND } = req;

    if (!Ma_ND) {
      return res.errorValid("mã người dùng không tồn tại!");
    }

    try {
      const nguoiDung = await NguoiDungServices.logout(Ma_ND);

      if (nguoiDung) {
        return res.successNoData("Đăng xuất thành công!");
      }

      return res.error(404, "refresh token không tồn tại!");
    } catch (error) {
      return res.errorServer();
    }
  },
};

module.exports = NguoiDungControllers;
