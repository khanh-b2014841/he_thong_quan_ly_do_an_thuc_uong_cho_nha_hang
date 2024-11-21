const db = require("../models")

const VaiTroServices = {
    async create(data) {
        return await db.VaiTro.create(data)
    },
    async update(Ma_VT, data, transaction) {
        await db.VaiTro.update(
            data,
            { where: { Ma_VT } },
            transaction
        )

        return await db.VaiTro.findOne({
            where: { Ma_VT },
            transaction
        })
    },
    async getOne(params) {
        return await db.VaiTro.findOne({
            where: params,
            include: [
                {
                    model: db.NguoiDung,
                    as: 'Nguoi_Dungs',
                    attributes: []
                }
            ],
            /* đếm số lượng người dùng */
            attributes: {
                include: [
                    [
                        db.Sequelize.fn(
                            "COUNT",
                            db.Sequelize.col("Nguoi_Dungs.Ma_ND")
                        ),
                        "SL_ND"
                    ]
                ]
            },
            group: ['VaiTro.Ma_VT']
        })
    },
    async getAll() {
        return await db.VaiTro.findAndCountAll({
            include: [
                {
                    model: db.NguoiDung,
                    as: 'Nguoi_Dungs',
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [
                        db.Sequelize.fn(
                            "COUNT",
                            db.Sequelize.col("Nguoi_Dungs.Ma_ND")
                        ),
                        "SL_ND"
                    ]
                ]
            },
            group: ['VaiTro.Ma_VT']
        })
    },
    async delete(Ma_VT) {
        return await db.VaiTro.destroy({
            where: { Ma_VT }
        });
    }
}

module.exports = VaiTroServices