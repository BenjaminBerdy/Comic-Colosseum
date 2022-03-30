const commentsResolvers = require('./comments');
const userResolvers = require('./users');
const comicsResolvers = require('./comics');
const storiesResolvers = require('./stories');

module.exports = {
    Query:{
        ...commentsResolvers.Query,
        ...userResolvers.Query,
        ...storiesResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...comicsResolvers.Mutation,
        ...storiesResolvers.Mutation
    }
}