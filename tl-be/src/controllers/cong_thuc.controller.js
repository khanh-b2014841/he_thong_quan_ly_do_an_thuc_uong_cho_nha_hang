const db = require("../models");
const CongThucServices = require("../services/cong_thuc.service");

const CongThucControllers = {
    async create(req, res) {
        const {
            Ma_NL,
            Ma_SP,
            Mo_Ta,
            Khoi_Luong
        } = req.body

        if (!Ma_NL || !Ma_SP || isNaN(+Khoi_Luong)) {
            return res.errorValid()
        }

        try {
            const congThuc = await CongThucServices.create({
                Ma_NL,
                Ma_SP,
                Mo_Ta: Mo_Ta ?? null,
                Khoi_Luong: +Khoi_Luong
            })

            if (congThuc) {
                return res.successNoData(
                    'Thêm mới công thức thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới công thức thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { Mo_Ta, Khoi_Luong } = req.body
        const { sp, nl } = req.query

        if (!sp || !nl) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const data = {}

            if (Mo_Ta) {
                data.Mo_Ta = Mo_Ta
            }

            if (isNaN(+Khoi_Luong)) {
                data.Khoi_Luong = +Khoi_Luong
            }

            const congThuc = await CongThucServices.update(
                {
                    Ma_NL: nl,
                    Ma_SP: sp,
                },
                data,
                transaction
            )

            if (congThuc) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật công thức thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật công thức thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { sp, nl } = req.query

        if (!sp || !nl) {
            return res.errorValid()
        }

        try {
            const congThuc = await CongThucServices.getOne({
                Ma_NL: nl,
                Ma_SP: sp,
            })

            if (congThuc) {
                return res.success(
                    'Lấy công thức thành công!',
                    congThuc
                )
            }

            return res.error(
                404,
                'Lấy công thức thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, nl, sp } = req.query

        try {
            const congThucs = await CongThucServices.getAll({
                page, limit, nl, sp
            })

            if (congThucs) {
                return res.success(
                    'Lấy tất cả công thức thành công!',
                    {
                        count: congThucs.count,
                        congThucs: congThucs.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả công thức thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { sp, nl } = req.query

        if (!sp || !nl) {
            return res.errorValid()
        }

        try {
            const congThuc = await CongThucServices.delete({
                Ma_NL: nl,
                Ma_SP: sp,
            })

            if (congThuc) {
                return res.successNoData(
                    'Xóa công thức thành công!'
                )
            }

            return res.error(
                404,
                'Xóa công thức thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = CongThucControllers