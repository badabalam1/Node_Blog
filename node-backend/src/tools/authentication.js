const jwt = require('jsonwebtoken')
const constants = require('../config/config')

module.exports = {
    IsLogin: (req, res) => {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, constants.JWT_SALT, (err, decoded) => {
                if (!err && decoded) {
                    req.user = decoded
                } else {
                    return res.send({ message: 'ACCESS_DENIED' })
                }
                if (req.user && req.user.id) {
                    return true
                }
            })
        } else {
            return res.send({ message: 'ACCESS_DENIED' })
        }
    }
}