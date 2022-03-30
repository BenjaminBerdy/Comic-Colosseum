const Comment = require('../../models/Comment');

module.exports = {
    Query: {
        async getComments(_, { comicOrStoryId }){

            try {
                const comments = await Comment.find({comicOrStoryId});
                return comments;
            } catch (err){
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createComment(_, {body, username, comicOrStoryId, userId }){

            try {
                const comments = new Comment({
                    body: body,
                    username: username,
                    createdAt: new Date().toISOString(),
                    comicOrStoryId: comicOrStoryId,
                    userId: userId
                })
                return comments;
            } catch (err){
                throw new Error(err);
            }

        },
        async deleteComment(_, { id }) {
    
          try {
            const comment = await Comment.findById(id);
            if (user.username === comment.username) {
              await comment.delete();
              return 'Comment Deleted Successfully';
            } else {
              throw new AuthenticationError('Action not allowed');
            }
          } catch (err) {
            throw new Error(err);
          }
        }
    }
}