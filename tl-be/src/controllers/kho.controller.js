const db = require("../models");
const KhoServices = require("../services/kho.service");

const KhoControllers = {
    async create(req, res) {
        const {
            Loai_Kho,
            Ghi_Chu
        } = req.body

        if (typeof Loai_Kho === 'undefined') {
            return res.errorValid(
                'loại kho không tồn tại!'
            )
        }

        try {
            const kho = await KhoServices.create({
                Loai_Kho: JSON.parse(Loai_Kho),
                Ghi_Chu: Ghi_Chu ?? null
            })

            if (kho) {
                return res.successNoData(
                    'Thêm mới kho thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            Loai_Kho,
            Ghi_Chu
        } = req.body
        const { ma } = req.params

        if (!ma || typeof Loai_Kho === 'undefined') {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const data = {
                Loai_Kho: JSON.parse(Loai_Kho)
            }

            if (Ghi_Chu) {
                data.Ghi_Chu = Ghi_Chu
            }

            const kho = await KhoServices.update(
                ma,
                data,
                transaction
            )

            if (kho) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật kho thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật kho thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { ma } = req.params

        if (!ma) {
            return res.errorValid(
                'mã kho không tồn tại!'
            )
        }

        try {
            const kho = await KhoServices.getOne(ma)

            if (kho) {
                return res.success(
                    'Lấy kho thành công!',
                    kho
                )
            }

            return res.error(
                404,
                'Lấy kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, type } = req.query

        try {
            const khos = await KhoServices.getAll({
                page, limit, type
            })

            if (khos) {
                return res.success(
                    'Lấy tất cả kho thành công!',
                    {
                        count: khos.count,
                        khos: khos.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { ma } = req.params

        if (!ma) {
            return res.errorValid(
                'mã kho không tồn tại!'
            )
        }

        try {
            const kho = await KhoServices.delete(ma)

            if (kho) {
                return res.successNoData(
                    'Xóa kho thành công!'
                )
            }

            return res.error(
                404,
                'Xóa kho thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = KhoControllers