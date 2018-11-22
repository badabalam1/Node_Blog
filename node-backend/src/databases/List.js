const mongoose = require('mongoose')

const { Schema } = mongoose

const ListSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comment: [{
        id: { type: String, required: false },
        comment: { type: String, required: false },
        createDate: { type: Date, default: Date.now }
    }]
}, { timestamps: true })

module.exports = mongoose.model('list', ListSchema)