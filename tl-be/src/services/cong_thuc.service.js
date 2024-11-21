const db = require("../models")

const CongThucServices = {
    async create(data) {
        return await db.CongThuc.create(data)
    },
    async update(params, data, transaction) {
        await db.CongThuc.update(
            data,
            { where: params },
            transaction
        )

        return await db.CongThuc.findOne({
            where: params,
            transaction
        })
    },
    async getOne(params) {
        return await db.CongThuc.findOne({
            where: params,
            include: [
                {
                    model: db.NguyenLieu,
                    as: 'Nguyen_Lieu'
                },
                {
                    model: db.SanPham,
                    as: 'San_Pham'
                }
            ]

        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const Ma_NL = params.nl
        const Ma_SP = params.sp
        const where = {}

        if (Ma_NL) {
            where.Ma_NL = Ma_NL
        }

        if (Ma_SP) {
            where.Ma_SP = Ma_SP
        }

        return await db.Ca.findAndCountAll({
            offset,
            limit,
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.NguyenLieu,
                    as: 'Nguyen_Lieu'
                },
                {
                    model: db.SanPham,
                    as: 'San_Pham'
                }
            ]
        })
    },
    async delete(params) {
        return await db.CongThuc.destroy({
            where: params
        });
    }
}

module.exports = CongThucServices