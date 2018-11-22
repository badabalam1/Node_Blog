const mongoose = require('mongoose')
const crypto = require('../tools/password')

const { Schema } = mongoose

const UserSchema = new Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
})

function encryptPassword(next) {
    if (!this.isModified('password')) return next();
    this.password = crypto.password(this.password);
    return next();
}

function removePassword(next) {
    this.select('-password -__v');
    return next();
}

UserSchema.pre('save', encryptPassword)
UserSchema.pre('update', encryptPassword)
UserSchema.pre('find', removePassword)
UserSchema.pre('findOne', removePassword)
UserSchema.pre('findById', removePassword)

UserSchema.methods.comparePassword = function (plainPassword) {
    if (this.password === crypto.password(plainPassword)) return true;
    return false;
}

UserSchema.statics.login = function (id, plainPassword) {
    return this.where('id', id).where('password', crypto.password(plainPassword));
}

module.exports = mongoose.model('user', UserSchema)