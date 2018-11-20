const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config/config')

const app = express()

const routes = require('./routes')

const PORT = process.env.PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(config.mongodbUri1)
const db = mongoose.connection
db.on('error', err => {
    console.error(err)
    console.log('✗ DB connection error. Please make sure DB is running.')
    process.exit()
})

db.once('open', () => {
    console.log('✓ DB connection success.')
})

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})

app.use('/', routes)
