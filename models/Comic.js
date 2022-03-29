const{ model, Schema} = require('mongoose');

const comicSchema = new Schema({
    title: String,
    author: String,
    authorID: String,
    publishDate: String,
    likes: Int,
    comments: [{type: Schema.Types.ObjectId,  ref: 'comments'}],
    canvas: [[String]],
    xpos:[Int],
    ypos:[Int],
    textFonts: [String],
    textSizes: [Int],
    comicText: [String],
    textColor: [String],
    backgroundColor: String,
})

module.exports = model('Comic', comicSchema)

