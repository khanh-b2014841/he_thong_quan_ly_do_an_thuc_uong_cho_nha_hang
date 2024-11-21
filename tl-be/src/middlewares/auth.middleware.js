const jwt = require('jsonwebtoken')
const { ROLEKEYS } = require('../utils')

const AuthMiddlewares = {
    verifyToken(req, res, next) {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return res.status(401).json({
            message: 'Token không tồn tại!'
        })

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Token không hợp lệ!'
                    })
                }

                req.Ma_ND = data.Ma_ND
                req.Key_VT = data.Key_VT
                next();
            }
        );
    },
    adminRole(req, res, next) {
        if (req.Key_VT !== ROLEKEYS[0]) {
            return res.status(403).json({
                message: 'Không đủ quyền!'
            })
        }
        next()
    }
}

module.exports = AuthMiddlewares 