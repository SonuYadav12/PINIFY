const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/pinifydb");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        ref: 'Post'
    }],
    dp: {
        type: String,
        default: 'default.jpg'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
