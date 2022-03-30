const { UserInputError } = require('apollo-server');

const Comic = require('../../models/Comic');

module.exports = {
  Query: {
    async getComics() {
      try {
        const comics = await Comic.find().sort({ createdAt: -1 });
        return comics;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getComic(_, { comicId }) {
      try {
        const comic = await Comic.findById(comicId);
        if (comic) {
          return comic;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createComic(_, { author, authorId }) {

      const newComic = new Comic({
        title: "Untitled Name",
        author: author,
        authorId: authorId,
        publishDate: "",
        likes: 0,
        backgroundColor: "",
        points: [],
        strokeWidth: [],
        stroke: [],
        fontFamily: [],
        fontSize: [],
        text: [],
        x: [],
        y: [],
      });

      const comic = await newComic.save();

      return comic;
    },
    async deleteComic(_, { comicId }) {

      try {
        const comic = await Comic.findById(comicId);
        if (user.username === comic.author) {
          await comic.delete();
          return 'Comic Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
