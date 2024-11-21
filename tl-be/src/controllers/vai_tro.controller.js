const db = require("../models");
const VaiTroServices = require("../services/va_tro.service");

const VaiTroControllers = {
    async create(req, res) {
        const { Ten_VT, Key_VT } = req.body

        if (!Ten_VT || isNaN(+Key_VT)) {
            return res.errorValid()
        }

        try {
            const vaiTro = await VaiTroServices.create({
                Key_VT: parseInt(Key_VT),
                Ten_VT
            })

            if (vaiTro) {
                return res.successNoData(
                    'Thêm mới vai trò thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới vai trò thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const { Ten_VT, Key_VT } = req.body
        const { ma } = req.params

        if (!Ten_VT || isNaN(+Key_VT) || !ma) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const vaiTro = await VaiTroServices.update(
                ma,
                {
                    Key_VT: parseInt(Key_VT),
                    Ten_VT
                },
                transaction
            )

            if (vaiTro) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật vai trò thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật vai trò thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { ma, key } = req.params

        if ((!ma && isNaN(+key))) {
            return res.errorValid(
                'mã hoặc key vai trò không tồn tại!'
            )
        }

        try {
            const params = {}
            if (ma) {
                params.Ma_VT = ma
            }

            if (!isNaN(key)) {
                params.Key_VT = parseInt(key)
            }
            const vaiTro = await VaiTroServices.getOne(params)

            if (vaiTro) {
                return res.success(
                    'Lấy vai trò thành công!',
                    vaiTro
                )
            }

            return res.error(
                404,
                'Lấy vai trò thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        try {
            const vaiTros = await VaiTroServices.getAll()

            if (vaiTros) {
                return res.success(
                    'Lấy tất cả vai trò thành công!',
                    {
                        count: vaiTros.count,
                        vaiTros: vaiTros.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả vai trò thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { ma } = req.params

        if (!ma) {
            return res.errorValid(
                'mã vai trò không tồn tại!'
            )
        }

        try {
            const vaiTro = await VaiTroServices.delete(ma)

            if (vaiTro) {
                return res.successNoData(
                    'Xóa vai trò thành công!'
                )
            }

            return res.error(
                404,
                'Xóa vai trò thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = VaiTroControllers