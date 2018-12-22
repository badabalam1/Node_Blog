const mongoose = require('mongoose')

const { Schema } = mongoose

const ListSchema = new Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'comment' }],
    goods: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' }],
    goodsCount: { type: Number, default: 0 },
}, { timestamps: true })

function remove__v(next) {
    this.select('-__v');
    return next();
}

function updateGoodsCount(next) {
    this.goodsCount = this.goods.length;
    return next();
}

ListSchema.pre('save', updateGoodsCount);
ListSchema.pre('find', remove__v);
ListSchema.pre('findOne', remove__v);
ListSchema.pre('findById', remove__v);

module.exports = mongoose.model('list', ListSchema)