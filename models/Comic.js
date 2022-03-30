const{ model, Schema} = require('mongoose');

const comicSchema = new Schema({
    title: String,
    author: {type: Schema.Types.ObjectId,  ref: 'users'},
    publishDate: String,
    likes: Int,
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

