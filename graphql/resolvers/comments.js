const Comment = require('../../models/Comment');

module.exports = {
    Query: {
        async getComments(_, { comicOrStoryId }){

            try {
                const comments = await Comment.find({comicOrStoryId}).sort({ createdAt: 1 });;
                return comments;
            } catch (err){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createComment(_, {body, username, comicOrStoryId, userId}){
            try {
                const newcomment = new Comment({
                    body: body,
                    username: username,
                    createdAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                    comicOrStoryId: comicOrStoryId,
                    userId: userId
                })
                const comments = await newcomment.save();
                return comments;
            } catch (err){
                throw new Error(err);
            }

        },
        async deleteComment(_, { id, username }) {
    
          try {
            const comment = await Comment.findById(id);
            if (username  === comment.username) {
              await comment.delete();
              return 'Comment Deleted Successfully';
            } else {
              throw new Error('Action not allowed');
            }
          } catch (err) {
            throw new Error(err);
          }
        }
    }
}