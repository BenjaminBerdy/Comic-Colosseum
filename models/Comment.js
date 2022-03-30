const {model,Schema} = require('mongoose');

const commentSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
<<<<<<< HEAD
    comicId: String,
=======
    comicID: String,
>>>>>>> 687e6b9a46bbdfb3537aeebff06cbe8c6a199671
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Comment', commentSchema)