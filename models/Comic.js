const{ model, Schema} = require('mongoose');

const comicSchema = new Schema({
    title: String,
    author: String,
    authorId: String,
    publishDate: String,
    likes: Number,
    backgroundColor: String,
    points: [[Number]],
    strokeWidth: [Number],
    stroke: [String],
    fontFamily: [String],
    fontSize: [Number],
    text: [String],
    textx: [Number],
    texty: [Number],
})

module.exports = model('Comic', comicSchema)

