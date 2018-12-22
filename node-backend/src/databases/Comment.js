const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
    post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'list' },
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    comment: { type: String, required: true }
}, { timestamps: true })

function remove__v(next) {
    this.select('-__v')
    return next()
}

CommentSchema.pre('find', remove__v)
CommentSchema.pre('findOne', remove__v)
CommentSchema.pre('findById', remove__v)

module.exports = mongoose.model('comment', CommentSchema)