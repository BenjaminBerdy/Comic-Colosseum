const{model, Schema} = require('mongoose');

const storySchema = new Schema({
    title: String,
    author: String,
    authorId: String,
    publishDate: String,
    likes: Number,
    backgroundColor: String,
    fontFamily: [String],
    fontSize: [Number],
    text: [String],
    textx: [Number],
    texty: [Number],
})

module.exports = model('Story', storySchema)