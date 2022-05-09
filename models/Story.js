const{model, Schema} = require('mongoose');

const storySchema = new Schema({
    title: String,
    author: String,
    authorId: String,
    publishDate: String,
    likes: Number,
    likers: [String],
    backgroundColor: String,
    fontFamily: [String],
    fontSize: [Number],
    fontStyle: [String],
    textDecoration: [String],
    textColor: [String],
    text: [String],
    textx: [Number],
    texty: [Number],
})

module.exports = model('Story', storySchema)