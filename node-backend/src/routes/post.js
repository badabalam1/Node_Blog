const User = require('../databases/User')
const List = require('../databases/List')
const authentication = require('../tools/authentication')
const checkProperty = require('../tools/validator')

exports.post_write = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        if (await user.admin !== true) {
            throw new Error('권한이 없습니다.')
        }
        const data = { id: user.id, title: req.body.title, content: req.body.content }
        const target = (await List.create(data))
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

exports.comment_write = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        const list = (await List.findById(req.params.postId))
        if (!list) throw new Error('글이 존재하지 않습니다.')

        const data = checkProperty.checkProperty(req.body, 'comment', true)
        data.data.id = user.id
        list.comment.push(data.data)
        list.save()
        return res.send({ message: 'SUCCESS' })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.comment_update = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        if (req.params.postId.length !== 24) throw new Error('글이 존재하지 않습니다.')
        const list = (await List.findById(req.params.postId))
        if (!list) throw new Error('글이 존재하지 않습니다.')
        for (let i = 0; i < list.comment.length; i++) {
            console.log(list.comment[i]._id)
            if (list.comment[i]._id.toString() === req.body.comment_id.toString()) {
                if (list.comment[i].id === user.id) {
                    const data = checkProperty.checkProperty(req.body, 'comment', true)
                    list.comment[i].comment = data.data.comment
                    break
                } else {
                    throw new Error('권한이 없습니다.')
                }
            }
            if (i === list.comment.length - 1) {
                throw new Error('댓글 존재하지 않습니다.');
            }
        }
        list.save()
        return res.send({ message: 'SUCCESS' })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.comment_delete = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const user = (await User.findById(req.user.id))
        if (req.params.postId.length !== 24) throw new Error('글이 존재하지 않습니다.')
        const list = (await List.findById(req.params.postId))
        if (!list) throw new Error('글이 존재하지 않습니다.')
        for (let i = 0; i < list.comment.length; i++) {
            console.log(list.comment[i]._id)
            if (list.comment[i]._id.toString() === req.body.comment_id.toString()) {
                if (list.comment[i].id === user.id) {
                    list.comment.pull(req.body.comment_id)
                    break
                } else {
                    throw new Error('권한이 없습니다.')
                }
            }
            if (i === list.comment.length - 1) {
                throw new Error('댓글 존재하지 않습니다.');
            }
        }
        const target = list.save()
        return res.send({ message: 'SUCCESS', target })
    } catch ({ message }) {
        return res.send({ message })
    }
}