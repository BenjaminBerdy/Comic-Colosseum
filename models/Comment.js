const {model,Schema} = require('mongoose');

const commentSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Comment', commentSchema)