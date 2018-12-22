const User = require('../databases/User')
const jwt = require('jsonwebtoken')
const constants = require('../config/config')

exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const member = (await User.login(req.body.id, req.body.password))[0]
        if (!member) {
            throw new Error('아이디 혹은 비밀번호가 틀렸습니다.')
        }
        const token = jwt.sign({ id: member._id }, constants.JWT_SALT)
        return res.send({ message: 'SUCCESS', token, member })
    } catch ({ message }) {
        return res.send({ message })
    }
}