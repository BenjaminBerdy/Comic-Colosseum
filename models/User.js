const{ model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email : String,
    createdAt: String,
    profileImageURL: String,
    likedComics: {type: Schema.Types.ObjectId,  ref: 'comics'},
    likedStories: {type: Schema.Types.ObjectId,  ref: 'stories'},
    followedCreators: {type: Schema.Types.ObjectId,  ref: 'users'}
})

module.exports = model('User', userSchema)

