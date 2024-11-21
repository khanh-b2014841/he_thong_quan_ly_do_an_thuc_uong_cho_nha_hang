const jwt = require('jsonwebtoken')

const AuthServices = {
    generateAccessToken(payload) {
        const { Ma_ND, Key_VT } = payload

        return jwt.sign(
            { Ma_ND, Key_VT },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d' /* 15m */
            }
        )
    },
    generateRefreshToken(payload) {
        const { Ma_ND, Key_VT } = payload

        return jwt.sign(
            { Ma_ND, Key_VT },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: '7d'
            }
        )
    }
}

module.exports = AuthServices