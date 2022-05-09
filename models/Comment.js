const {model,Schema} = require('mongoose');

const commentSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comicOrStoryId: String,
    userId: String,
})

module.exports = model('Comment', commentSchema)