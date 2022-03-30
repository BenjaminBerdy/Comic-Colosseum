const { UserInputError } = require('apollo-server');

const Story = require('../../models/Story');

module.exports = {
  Query: {
    async getStories() {
      try {
        const stories = await Story.find().sort({ createdAt: -1 });
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

      const newStory = new Story({
        title: "Untitled Name",
        author: author,
        authorId: authorId,
        publishDate: "",
        likes: 0,
        backgroundColor: "",
        fontFamily: [],
        fontSize: [],
        text: [],
        x: [],
        y: [],
      });

      const story = await newStory.save();

      return story;
    },
    async deleteStory(_, { id }) {

      try {
        const story = await Story.findById(id);
        if (user.username === story.author) {
          await story.delete();
          return 'Story Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateStory(_, { id, title, backgroundColor, fontFamily, fontSize, text, x, y }) {

        try {
            const story = await Story.findByIdAndUpdate(id, {title: title, backgroundColor: backgroundColor, fontFamily: fontFamily, fontSize: fontSize, text: text, x: x, y:y});
            return story;
        } catch (err) {
            throw new Error(err);
        }
    },
    async publishStory(_, { id }) {

        try {
            const story = await Story.findByIdAndUpdate(id, {publishDate: new Date().toISOString()});
            return story;
        } catch (err) {
            throw new Error(err);
        }
    },
    async likeStory(_, { id, likes }) {

        try {
            const story = await Story.findByIdAndUpdate(id, {likes: likes});
            return story;
        } catch (err) {
            throw new Error(err);
        }
    }
  }
};

