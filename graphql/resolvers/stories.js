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
    },
    async searchStoryTitle(_, { title }) {

      try {
          const stories = await Story.find({title});
          return stories;
      } catch (err) {
          throw new Error(err);
      }
  },
  async searchStoryAuthor(_, { author }) {

      try {
          const stories = await Story.find({author});
          return stories;
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
        textx: [],
        texty: [],
      });

      const story = await newStory.save();

      return story;
    },
    async deleteStory(_, { id, authorId }) {

      try {
        const story = await Story.findById(id);
        if (authorId === story.authorId) {
          await story.delete();
          return 'Story Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateStory(_, { id, title, backgroundColor, fontFamily, fontSize, text, textx, texty }) {

        try {
            const story = await Story.findByIdAndUpdate(id, {title: title, backgroundColor: backgroundColor, fontFamily: fontFamily, fontSize: fontSize, text: text, textx: textx, texty:texty});
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

