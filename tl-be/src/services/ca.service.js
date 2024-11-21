const db = require("../models")

const CaServices = {
    async create(data) {
        return await db.Ca.create(data)
    },
    async update(Ma_Ca, data, transaction) {
        await db.Ca.update(
            data,
            { where: { Ma_Ca } },
            transaction
        )

        return await db.Ca.findOne({
            where: { Ma_Ca },
            transaction
        })
    },
    async getOne(Ma_Ca) {
        return await db.Ca.findOne({
            where: { Ma_Ca },
            include: [
                {
                    model: db.DonGaLuong,
                    as: 'DGL'
                },
                {
                    model: db.LichLamViec,
                    as: 'LLV'
                }
            ]

        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const order = params.order ?? 'desc' // sắp xếp giảm dần
        const orderCheck = []

        if (['desc', 'asc'].includes(order)) {
            orderCheck.push(['Gio_BD', order.toUpperCase()])
        }

        return await db.Ca.findAndCountAll({
            offset,
            limit,
            include: [
                {
                    model: db.DonGaLuong,
                    as: 'DGL'
                },
                {
                    model: db.LichLamViec,
                    as: 'LLV'
                }
            ],
            order: [orderCheck]
        })
    },
    async delete(Ma_Ca) {
        return await db.Ca.destroy({
            where: { Ma_Ca }
        });
    }
}

module.exports = CaServices