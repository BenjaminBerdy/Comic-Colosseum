const { UserInputError } = require('apollo-server');

const Story = require('../../models/Story');
const User = require('../../models/User');
const Comment = require('../../models/Comment');



module.exports = {
  Query: {
    async getStories() {
      try {
        const stories = await Story.find().sort({ publishDate: -1 });
        return stories;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getStory(_, { id }) {
      try {
        const story = await Story.findById(id);
        if (story) {
          return story;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createStory(_, { author, authorId }) {
      const errors = {};
      const user = await User.findById(authorId);
      if(!user){
        errors.general = 'User not found'
        throw new UserInputError('User not found',{errors});
      }

      const newStory = new Story({
        title: "Untitled Name",
        author: author,
        authorId: authorId,
        publishDate: "",
        likes: 0,
        likers: [],
        backgroundColor: "",
        fontFamily: [],
        fontSize: [],
        fontStyle: [],
        textDecoration: [],
        textColor: [],
        text: [],
        textx: [],
        texty: [],
      });

      const story = await newStory.save();

      return story;
    },
    async deleteStory(_, { id, authorId }) {
      const errors = {};
      var user = await User.findById(authorId);
      if(!user){
        errors.general = 'User not found'
        throw new UserInputError('User not found',{errors});
      }

      try {
        var story = await Story.findById(id);
        if (authorId === story.authorId) {
          user = await User.findByIdAndUpdate(authorId, {totallikes: user.totallikes - story.likes})
      
          for(let i = 0; i < story.likers.length; i++){
            var otheruser = await User.findById(story.likers[i])
            likedStories = otheruser.likedStories.filter(function(e) {return e !== id})
            otheruser = await User.findByIdAndUpdate(story.likers[i], {likedStories: likedStories})
          }

          const comments = await Comment.find()
            for(let j = 0; j < comments.length; j++){
                if(comments[j].id === id){
                    await comments[j].delete();
                }
            }


          await story.delete();
          return 'Story Deleted Successfully';
        } else {
          throw new Error('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateStory(_, { id, title, backgroundColor, fontFamily, fontSize, fontStyle, textDecoration, textColor, text, textx, texty }) {

        try {
            const story = await Story.findByIdAndUpdate(id, {title: title, backgroundColor: backgroundColor, fontFamily: fontFamily, 
              fontStyle: fontStyle, textDecoration: textDecoration, textColor: textColor, fontSize: fontSize, text: text, textx: textx, texty:texty});
            return story;
        } catch (err) {
            throw new Error(err);
        }
    },
    async publishStory(_, { id }) {

        try {
            const story = await Story.findByIdAndUpdate(id, {publishDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()});
            return story;
        } catch (err) {
            throw new Error(err);
        }
    }
  }
};

