const commentsResolvers = require('./comments');
const userResolvers = require('./users');

module.exports = {
    Query:{
        ...commentsResolvers.Query,
        ...userResolvers.Query
    },
    Mutation:{
        ...userResolvers.Mutation
    }
}