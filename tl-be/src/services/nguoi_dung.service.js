const db = require("../models")

const NguoiDungServices = {
    async create(data) {
        return await db.NguoiDung.create(data)
    },
    async update(Ma_ND, data, transaction) {
        await db.NguoiDung.update(
            data,
            { where: { Ma_ND } },
            transaction
        )

        return await db.NguoiDung.findOne({
            where: { Ma_ND },
            transaction
        })
    },
    async getOne(params, isPassword = false) {
        return await db.NguoiDung.findOne({
            where: params,
            include: [
                {
                    model: db.VaiTro,
                    as: 'Vai_Tro'
                }
            ],
            attributes: { exclude: !isPassword ? ['Mat_Khau'] : [] }
        })
    },
    async logout(Ma_ND) {
        const nguoiDung = await db.NguoiDung.findOne({
            where: { Ma_ND },
            attributes: { exclude: ['Mat_Khau'] }
        })
        if (nguoiDung) {
            nguoiDung.Token = null
            return await nguoiDung.save()
        }
        return null
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const Ma_VT = params.role
        const where = {}

        if (typeof params.status !== 'undefined') {
            where.Trang_Thai = JSON.parse(params.status)
        }

        if (Ma_VT) {
            where.Ma_VT = Ma_VT
        }

        return await db.NguoiDung.findAndCountAll({
            offset,
            limit,
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.VaiTro,
                    as: 'Vai_Tro'
                }
            ],
            attributes: { exclude: ['Mat_Khau'] }
        })
    },
}

module.exports = NguoiDungServices