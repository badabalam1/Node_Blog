const User = require('../databases/User')
const List = require('../databases/List')
const { IsLogin, Login } = require('../tools/authentication')
const { checkProperty } = require('../tools/validator')

exports.post = async (req, res) => {
    try {
        if (Login(req, res)) return
        const list = (await List.find({}, { comment: false }))
        if (!list) throw new Error('오류가 발생했습니다.')
        if (req.user) {
            const user = (await User.findById(req.user.id))
            console.log(user)
            return res.send({ message: 'SUCCESS', list, user })
        } else {
            return res.send({ message: 'SUCCESS', list, 'user': { admin: undefined } })
        }
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.select = async (req, res) => {
    try {
        if (Login(req, res)) return
        const list = (await List.findById(req.params.postId).populate('id'))
        if (!list) throw new Error('글이 존재하지 않습니다.')
        if (req.user) {
            return res.send({ message: 'Success', list, user: true })
        } else {
            return res.send({ message: 'Success', list, admin: false })
        }
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.write = async (req, res) => {
    try {
        console.log(req.body)
        if (IsLogin(req, res)) return
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

exports.get_user = async (req, res) => {
    try {
        if (Login(req, res)) return
        if (req.user) {
            const user = (await User.findById(req.user.id))
            return res.send({ message: 'SUCCESS', user })
        } else {
            return res.send({ message: 'SUCCESS', 'user': { admin: undefined } })
        }
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.post_update = async (req, res) => {
    try {
        if (IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        const list = (await List.findById(req.params.postId))
        if (await user.admin !== true) {
            throw new Error('권한이 없습니다.')
        }
        const data = { title: req.body.title, content: req.body.content }
        list.title = req.body.title
        list.content = req.body.content
        list.save()
        return res.send({ message: 'Success' })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.post_delete = async (req, res) => {
    try {
        if (IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        const list = (await List.findById(req.params.postId))
        console.log(list)
        if (await user.admin !== true) {
            throw new Error('권한이 없습니다.')
        }
        const target = list.remove();
        return res.send({ result: true, message: '삭제되었습니다.' })
    } catch ({ message }) {
        return res.send({ result: false, message })
    }
}

