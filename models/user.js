const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'This field is required']
    },
    email: {
        type: String,
        required: [true, 'This field is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'This field is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        required: [true, 'This field is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.id = _id;
    return user;
}

module.exports = model('user', UserSchema);