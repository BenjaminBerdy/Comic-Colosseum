const Comment = require('../../models/Comment');

module.exports = {
    Query: {
        async getComments(_, {comicOrStoryId}){
            try{
                const comments = await Comment.find({comicOrStoryId});
                return comments;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}