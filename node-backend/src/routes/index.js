const router = require('express').Router()
const config = require('./config')

router.all('/*', config.CORS)

module.exports = router