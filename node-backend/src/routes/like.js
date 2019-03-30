const List = require('../databases/List')
const { IsLogin, Login } = require('../tools/authentication')

exports.like_get = async (req, res) => {
    try {
        if (Login(req, res)) return
        if (req.params.postId.length !== 24) throw new Error('글이 존재하지 않습니다.')
        const list = (await List.findById(req.params.postId).populate('id'))
        if (!list) throw new Error('글이 존재하지 않습니다.')
        if (req.user) {
            if (list.goods.indexOf(req.user.id) === -1) {
                return res.send({ message: 'Success', goods: false, goodsCount: list.goodsCount })
            }
        }
        return res.send({ message: 'Success', goods: true, goodsCount: list.goodsCount })
    } catch ({ message }) {
        return res.send({ message })
    }
}

exports.like_post = async (req, res) => {
    try {
        if (IsLogin(req, res)) return
        if (req.params.postId.length !== 24) throw new Error('글이 존재하지 않습니다.')
        const list = (await List.findById(req.params.postId))
        if (list.goods.indexOf(req.user.id) === -1) {
            list.goods.push(req.user.id)
            list.save()
            return res.send({ message: 'Success', like: true })
        } else {
            list.goods.pull(req.user.id)
            list.save()
            return res.send({ message: 'Success', like: false })
        }
    } catch ({ message }) {
        return res.send({ message })
    }
}