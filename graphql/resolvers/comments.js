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
                const newcomment = new Comment({
                    body: body,
                    username: username,
                    createdAt: new Date().toISOString(),
                    comicOrStoryId: comicOrStoryId,
                    userId: userId
                })
                const comments = await newcomment.save();
                return comments;
            } catch (err){
                throw new Error(err);
            }

        },
        async deleteComment(_, { id,userId }) {
    
          try {
            const comment = await Comment.findById(id);
            if (userId === comment.userId) {
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