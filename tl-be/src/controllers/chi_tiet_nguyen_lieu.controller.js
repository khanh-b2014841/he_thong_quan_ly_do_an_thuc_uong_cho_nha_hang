const db = require("../models");
const ChiTietNguyenLieuServices = require("../services/chi_tiet_nguyen_lieu.service");

const ChiTietNguyenLieuControllers = {
    async create(req, res) {
        const {
            Ma_Kho,
            Ma_NL,
            Gia_Nhap,
            Gia_Xuat,
            Khoi_Luong,
            Ngay_SX,
            Ngay_HH
        } = req.body

        if ((isNaN(+Gia_Nhap) && isNaN(+Gia_Xuat)) || isNaN(+Khoi_Luong) || !Ma_Kho || !Ma_NL || !Ngay_HH || !Ngay_SX) {
            return res.errorValid()
        }

        try {
            const chiTietNguyenLieu = await ChiTietNguyenLieuServices.create({
                Ma_Kho,
                Ma_NL,
                Gia_Nhap: +Gia_Nhap,
                Gia_Xuat: +Gia_Xuat,
                Khoi_Luong: +Khoi_Luong,
                Ngay_SX,
                Ngay_HH
            })

            if (chiTietNguyenLieu) {
                return res.successNoData(
                    'Thêm mới chi tiết nguyên liệu thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới chi tiết nguyên liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            Gia_Nhap,
            Gia_Xuat,
            Khoi_Luong,
            Ngay_SX,
            Ngay_HH
        } = req.body
        const {
            kho, nl
        } = req.query

        if ((isNaN(+Gia_Nhap) && isNaN(+Gia_Xuat)) || isNaN(+Khoi_Luong) || !kho || !nl || !Ngay_HH || !Ngay_SX) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const chiTietNguyenLieu = await ChiTietNguyenLieuServices.update(
                {
                    Ma_Kho: kho,
                    Ma_NL: nl,
                },
                {
                    Gia_Nhap: +Gia_Nhap,
                    Gia_Xuat: +Gia_Xuat,
                    Khoi_Luong: +Khoi_Luong,
                    Ngay_SX,
                    Ngay_HH
                },
                transaction
            )

            if (chiTietNguyenLieu) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật chi tiết nguyên liệu thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật chi tiết nguyên liệu thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const {
            kho, nl
        } = req.query

        if (!kho || !nl) {
            return res.errorValid(
                'mã kho hoặc mã nguyên liệu không tồn tại!'
            )
        }

        try {
            const chiTietNguyenLieu = await ChiTietNguyenLieuServices.getOne({
                Ma_Kho: kho,
                Ma_NL: nl,
            })

            if (chiTietNguyenLieu) {
                return res.success(
                    'Lấy chi tiết nguyên liệu thành công!',
                    chiTietNguyenLieu
                )
            }

            return res.error(
                404,
                'Lấy chi tiết nguyên liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, order, by, kho, nl } = req.query

        try {
            const chiTietNguyenLieus = await ChiTietNguyenLieuServices.getAll({
                page, limit, order, by, kho, nl
            })

            if (chiTietNguyenLieus) {
                return res.success(
                    'Lấy tất cả chi tiết nguyên liệu thành công!',
                    {
                        count: chiTietNguyenLieus.count,
                        chiTietNguyenLieus: chiTietNguyenLieus.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả chi tiết nguyên liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const {
            kho, nl
        } = req.query

        if (!kho || !nl) {
            return res.errorValid(
                'mã kho hoặc mã nguyên liệu không tồn tại!'
            )
        }

        try {
            const chiTietNguyenLieu = await ChiTietNguyenLieuServices.delete({
                Ma_Kho: kho,
                Ma_NL: nl,
            })

            if (chiTietNguyenLieu) {
                return res.successNoData(
                    'Xóa chi tiết nguyên liệu thành công!'
                )
            }

            return res.error(
                404,
                'Xóa chi tiết nguyên liệu thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = ChiTietNguyenLieuControllers