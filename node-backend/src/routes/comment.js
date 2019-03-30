const User = require('../databases/User')
const List = require('../databases/List')
const Comment = require('../databases/Comment')
const authentication = require('../tools/authentication')
const checkProperty = require('../tools/validator')

exports.write = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const post = (await List.findById(req.params.postId))
        if (!post) {
            throw new Error('글이 존재하지 않습니다.')
        }
        const data = checkProperty.checkProperty(req.body, 'comment', true)
        if (data.message !== 'SUCCESS') {
            throw new Error(data.message)
        }
        const comment = (await Comment.findById((await Comment.create({ post: post._id, id: req.user.id, comment: data.data.comment }))._id).populate('id'))
        post.comments.push(comment._id)
        await post.save()
        comment.__v = undefined
        return res.send({ message: 'SUCCESS', comment })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.select = async (req, res) => {
    try {
        const comments = (await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 }).populate('id'))
        return res.send({ message: 'SUCCESS', comments })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.update = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const target = (await Comment.findById(req.params.commentId))
        if (!target) {
            throw new Error('존재하지 않는 댓글입니다.')
        }
        if (req.user.id !== target.id.toString()) {
            throw new Error('권한이 부족합니다.')
        }
        const { message, data: { comment: content } } = checkProperty.checkProperty(req.body, 'comment', true)
        if (message !== 'SUCCESS') {
            throw new Error(message)
        }
        console.log(content)
        target.comment = content;
        const comment = (await target.save())
        return res.send({ message: 'SUCCESS', comment })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.remove = async (req, res) => {
    try {
        if (authentication.IsLogin(req, res)) return
        const target = (await Comment.findById(req.params.commentId))
        if (!target) {
            throw new Error('존재하지 않는 댓글입니다.')
        }
        if (req.user.id !== target.id.toString()) {
            throw new Error('권한이 부족합니다.')
        }
        const post = (await List.findById(target.post))
        if (post) {
            post.comments.pull(target._id)
            await post.save()
        }
        await Comment.remove({ post: target.id })
        const comment = (await target.remove())
        return res.send({ message: 'SUCCESS', comment })
    } catch ({ message }) {
        return res.send({ message })
    }
}