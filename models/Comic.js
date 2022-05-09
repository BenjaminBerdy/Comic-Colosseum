const{ model, Schema} = require('mongoose');

const comicSchema = new Schema({
    title: String,
    author: String,
    authorId: String,
    publishDate: String,
    likes: Number,
    likers: [String],
    backgroundColor: String,
    linex: [Number],
    liney: [Number],
    points: [[Number]],
    strokeWidth: [Number],
    stroke: [String],
    fontFamily: [String],
    fontSize: [Number],
    text: [String],
    textcolor: [String],
    textx: [Number],
    texty: [Number],
})

module.exports = model('Comic', comicSchema)

