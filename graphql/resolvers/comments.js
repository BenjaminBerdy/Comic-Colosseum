const Comment = require('../../models/Comment');

module.exports = {
    Query: {
        async getComments(_, {comicId}){
            try{
                const comments = await Comment.find({comicId});
                return comments;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}