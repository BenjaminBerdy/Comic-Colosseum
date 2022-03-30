const Comment = require('../../models/Comment');

module.exports = {
    Query: {
<<<<<<< HEAD
        async getComments(_, {comicId}){
=======
        async getComments(_,{comicId}){
>>>>>>> 687e6b9a46bbdfb3537aeebff06cbe8c6a199671
            try{
                const comments = await Comment.find({comicId});
                return comments;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}