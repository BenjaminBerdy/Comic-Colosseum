const{ ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const {MONGODB} = require('./config.js');
const PORT = process.env.PORT || 5000;
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

mongoose.connect(MONGODB,{useNewUrlParser:true})
    .then(() =>{
        console.log('MongoDB Connected');
        return server.listen({port: PORT});
    }).then((res) => {
        console.log(`Server running at ${res.url}`);
    }); 

 