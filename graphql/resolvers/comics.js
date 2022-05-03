const { UserInputError } = require('apollo-server');

const Comic = require('../../models/Comic');
const User = require('../../models/User');

module.exports = {
  Query: {
    async getComics() {
      try {
        const comics = await Comic.find().sort({ publishDate: -1 });
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
    }
  },
  Mutation: {
    async createComic(_, { author, authorId }) {
      const errors = {};
      const user = await User.findById(authorId);
      if(!user){
        errors.general = 'User not found'
        throw new UserInputError('User not found',{errors});
      }

      const newComic = new Comic({
        title: "Untitled Name",
        author: author,
        authorId: authorId,
        publishDate: "",
        likes: 0,
        backgroundColor: "#ffffff",
        linex: [],
        liney: [],
        points: [],
        strokeWidth: [],
        stroke: [],
        fontFamily: [],
        fontSize: [],
        text: [],
        textcolor: [],
        textx: [],
        texty: [],
      });

      const comic = await newComic.save();

      return comic;
    },
    async deleteComic(_, { id, authorId }) {
      const errors = {};
      const user = await User.findById(authorId);
      if(!user){
        errors.general = 'User not found'
        throw new UserInputError('User not found',{errors});
      }

      try {
        const comic = await Comic.findById(id);
        if (authorId === comic.authorId) {
          await comic.delete();
          return 'Comic Deleted Successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async updateComic(_, { id, title, backgroundColor, linex, liney, points, strokeWidth, stroke, fontFamily, fontSize, text, textcolor, textx, texty }) {

        try {
            const comic = await Comic.findByIdAndUpdate(id, {title: title, backgroundColor: backgroundColor, linex: linex, liney: liney, points: points,
              strokeWidth: strokeWidth, stroke: stroke, fontFamily: fontFamily, fontSize: fontSize, text: text, textcolor: textcolor, textx: textx, texty:texty});
            return comic;
        } catch (err) {
            throw new Error(err);
        }
    },
    async publishComic(_, { id }) {

        try {
            const comic = await Comic.findByIdAndUpdate(id, {publishDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()});
            return comic;
        } catch (err) {
            throw new Error(err);
        }
    }
  }
};
