const User = require('../databases/User')
const checkProperty = require('../tools/validator')

exports.register = async (req, res) => {
    try {
        if ((await User.findOne({ id: req.body.id }))) {
            throw new Error('이미 등록된 아이디입니다.')
        }
        const data = checkProperty.checkProperty(req.body, 'user', true)
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message)
        }
        data.data.admin = false;
        const user = await User.create(data.data)
        return res.send({ message: 'SUCCESS', user })
    } catch ({ message }) {
        return res.send({ message })
    }
}