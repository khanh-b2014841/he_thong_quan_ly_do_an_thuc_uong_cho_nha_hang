const NhaSanXuatServices = require("../services/nha_san_xuat.service");

const NhaSanXuatControllers = {
    async create(req, res) {
        const {
            Ten_NSX
        } = req.body

        if (!Ten_NSX) {
            return res.errorValid('Tên nhà sản xuất không tồn tại!')
        }

        try {
            const nhaSanXuat = await NhaSanXuatServices.create({
                Ten_NSX
            })

            if (nhaSanXuat) {
                return res.successNoData(
                    'Thêm mới nhà sản xuất thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới nhà sản xuất thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            Ten_NSX
        } = req.body
        const { ma } = req.params

        if (!Ten_NSX || !ma) {
            return res.errorValid()
        }

        try {
            const nhaSanXuat = await NhaSanXuatServices.update(
                ma,
                Ten_NSX
            )

            if (nhaSanXuat) {
                return res.successNoData(
                    'Cập nhật nhà sản xuất thành công!'
                )
            }

            return res.error(
                404,
                'Cập nhật nhà sản xuất thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { ma } = req.params

        if (!ma) {
            return res.errorValid(
                'mã nhà sản xuất không tồn tại!'
            )
        }

        try {
            const nhaSanXuat = await NhaSanXuatServices.getOne(ma)

            if (nhaSanXuat) {
                return res.success(
                    'Lấy nhà sản xuất thành công!',
                    nhaSanXuat
                )
            }

            return res.error(
                404,
                'Lấy nhà sản xuất thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit, name } = req.query

        try {
            const nhaSanXuats = await NhaSanXuatServices.getAll({
                page, limit, name
            })

            if (nhaSanXuats) {
                return res.success(
                    'Lấy tất cả nhà sản xuất thành công!',
                    {
                        count: nhaSanXuats.count,
                        nhaSanXuats: nhaSanXuats.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả nhà sản xuất thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { ma } = req.params

        if (!ma) {
            return res.errorValid(
                'mã nhà sản xuất không tồn tại!'
            )
        }

        try {
            const nhaSanXuat = await NhaSanXuatServices.delete(ma)

            if (nhaSanXuat) {
                return res.successNoData(
                    'Xóa nhà sản xuất thành công!'
                )
            }

            return res.error(
                404,
                'Xóa nhà sản xuất thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
}

module.exports = NhaSanXuatControllers