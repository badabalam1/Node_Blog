const User = require('../databases/User')
const List = require('../databases/List')
const authentication = require('../tools/authentication')
const checkProperty = require('../tools/validator')

exports.post = async (req, res) => {
    try {
        const list = (await List.find({}, { comment: false }))
        if (!list) throw new Error('오류가 발생했습니다.')
        return res.send({ message: 'SUCCESS', list })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.select = async (req, res) => {
    try {
        if (req.params.postId.length !== 24) throw new Error('글이 존재하지 않습니다.')
        const list = (await List.findById(req.params.postId).populate('id'))
        if (!list) throw new Error('글이 존재하지 않습니다.')
        return res.send({ message: 'SUCCESS', list })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.write = async (req, res) => {
    try {
        console.log(req.body)
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        if (await user.admin !== true) {
            throw new Error('권한이 없습니다.')
        }
        const data = { id: req.user.id, title: req.body.title, content: req.body.content }
        const target = (await List.findById((await List.create(data))._id).populate('id'))
        return res.send({ message: 'SUCCESS', target })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.post_update = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        if (await user.admin !== true) {
            throw new Error('권한이 없습니다.')
        }
        const data = { title: req.body.title, content: req.body.content }
        const target = (await List.update(data))
        return res.send({ message: 'SUCCESS', target })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.post_delete = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        if (req.params.postId.length !== 24) throw new Error('글이 존재하지 않습니다.')
        const list = (await User.findById(req.params.postId))
        if (await user.admin !== true) {
            throw new Error('권한이 없습니다.')
        }
        const target = list.remove();
        return res.send({ message: 'SUCCESS', target })
    } catch ({ message }) {
        return res.send({ message })
    }
}

