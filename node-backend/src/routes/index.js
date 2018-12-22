const router = require('express').Router()
const config = require('./config')
const user = require('./user')
const login = require('./login')
const post = require('./post')
const comment = require('./comment')

//라우터 모음
router.all('/*', config.CORS)
router.post('/register', user.register)
router.post('/login', login.login)
router.get('/post', post.post)
router.get('/post/:postId', post.select)
router.post('/write', post.write)
router.put('/:id', post.post_update)
router.get('/comment/:postId', comment.select)
router.post('/comment/:postId', comment.write)
router.put('/comment/:commentId', comment.update)
router.delete('/comment/:commentId', comment.remove)

module.exports = router
