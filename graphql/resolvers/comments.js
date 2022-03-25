const Comment = require('../../models/Comment');

module.exports = {
    Query: {
        async getComments(){
            try{
                const comments = await Comment.find();
                return comments;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}