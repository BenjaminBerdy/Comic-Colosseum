const commentsResolvers = require('./comments');
const userResolvers = require('./users');
const comicsResolvers = require('./comics');

module.exports = {
    Query:{
        ...commentsResolvers.Query,
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation,
        ...comicsResolvers.Mutation
    }
}