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
    async getComic(_, { id }) {
      try {
        const comic = await Comic.findById(id);
        if (comic) {
          return comic;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async searchComicTitle(_, { title }) {

        try {
            const comics = await Comic.find({title});
            return comics;
        } catch (err) {
            throw new Error(err);
        }
    },
    async searchComicName(_, { author }) {

        try {
            const comics = await Comic.find({author});
            return comics;
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
    async deleteComic(_, { id }) {

      try {
        const comic = await Comic.findById(id);
        if (user.username === comic.author) {
          await comic.delete();
          return 'Comic Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateComic(_, { id, title, backgroundColor, points, strokeWidth, stroke, fontFamily, fontSize, text, x, y }) {

        try {
            const comic = await Comic.findByIdAndUpdate(id, {title: title, backgroundColor: backgroundColor, points: points,
            strokeWidth: strokeWidth, stroke: stroke, fontFamily: fontFamily, fontSize: fontSize, text: text, x: x, y:y});
            return comic;
        } catch (err) {
            throw new Error(err);
        }
    },
    async publishComic(_, { id }) {

        try {
            const comic = await Comic.findByIdAndUpdate(id, {publishDate: new Date().toISOString()});
            return comic;
        } catch (err) {
            throw new Error(err);
        }
    },
    async likeComic(_, { id, likes }) {

        try {
            const comic = await Comic.findByIdAndUpdate(id, {likes: likes});
            return comic;
        } catch (err) {
            throw new Error(err);
        }
    }
  }
};
