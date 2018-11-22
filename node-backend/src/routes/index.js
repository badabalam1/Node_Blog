const router = require('express').Router()
const config = require('./config')
const user = require('./user')
const login = require('./login')
const post = require('./post')

//라우터 모음
router.all('/*', config.CORS)
router.post('/register', user.register)
router.post('/login', login.login)
router.post('/write', post.post_write)
router.put('/:id', post.post_update)
router.post('/comment/:postId', post.comment_write)
router.put('/comment/:postId', post.comment_update)
router.delete('/comment/:postId', post.comment_delete)

module.exports = router
