const {gql} = require('apollo-server');

module.exports = gql`
    type Comment{
        id: ID!
        body: String!
        user: User!
        createdAt: String!
        comicId: String!
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        profileImageURL: String!
        followedCreators: [User]!
    }
    type Comic{
        id: ID!
        title: String!
        author: String!
        authorId: String!
        publishDate: String!
        likes: Int!
        backgroundColor: String!
        points: [Int]!
        strokeWidth: [Int]!
        stroke: [String]!
        fontFamily: [String]!
        fontSize: [Int]!
        text: [String]!
        x: [Int]!
        y: [Int]!
    }
    type Query{
        getComments(comicId: String!): [Comment]
        getUsers: [User]
        getUser(id: ID!): User
        getComics: [Comic]
        getComic(id: ID!): Comic
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createComic(author: String!, authorId: String!): Comic!
        deleteComic(id: ID!): String!
        publishComic(id: ID!): String!
        updateComic(id: ID!, title: String!, author: String!, authorId: String!,
            publishDate: String!, likes: Int!, backgroundColor: String!,
            points: [Int]!, strokeWidth: [Int]!, stroke: [String]!, fontFamily: [String]!,
            fontSize: [Int]!, text: [String]!, x: [Int]!, y: [Int]!): Comic!
    }
`