const db = require("../models")

const NguyenLieuServices = {
    async create(data) {
        return await db.NguyenLieu.create(data)
    },
    async update(Ma_NL, data, transaction) {
        await db.NguyenLieu.update(
            data,
            { where: { Ma_NL } },
            transaction
        )

        return await db.NguyenLieu.findOne({
            where: { Ma_NL },
            transaction
        })
    },
    async getOne(Ma_NL) {
        return await db.NguyenLieu.findOne({
            where: { Ma_NL },
            include: [
                {
                    model: db.NhaSanXuat,
                    as: 'NSX'
                },
                {
                    model: db.ChiTietNguyenLieu,
                    as: 'CTNL'
                }
            ]

        })
    },
    async getAll(params) {
        const page = parseInt(params?.page) || 1;
        const limit = parseInt(params?.limit) || 10;
        const offset = (page - 1) * limit;
        const Ten_NL = params.name
        const Ma_NSX = params.nsx
        const where = {}

        if (Ten_NL) {
            where.Ten_NL = {
                [db.Sequelize.Op.like]: `%${Ten_NL}%`
            }
        }

        if (Ma_NSX) {
            where.Ma_NSX = Ma_NSX
        }

        return await db.NguyenLieu.findAndCountAll({
            offset,
            limit,
            ...(Object.keys(where).length > 0 && { where }),
            include: [
                {
                    model: db.NhaSanXuat,
                    as: 'NSX'
                },
                {
                    model: db.ChiTietNguyenLieu,
                    as: 'CTNL'
                }
            ]
        })
    },
    async delete(Ma_NL) {
        return await db.NguyenLieu.destroy({
            where: { Ma_NL }
        });
    }
}

module.exports = NguyenLieuServices